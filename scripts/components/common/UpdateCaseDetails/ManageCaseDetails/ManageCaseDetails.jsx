import React, { useContext } from "react";

import AssignedCaseworker from "../../CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import PermissionsChipInput from "../../PermissionsChipInput/PermissionsChipInput.jsx";
import StatusSelect from "../../CaseDetailInputs/StatusSelect.jsx";
import TagInput from "../../CaseDetailInputs/TagInput.jsx";
import { TranslationContext } from "context/translate";
import activePermissionsSystem from "../../../../consts/activePermissionsSystem.js";
import api from "@electedtech/api";
import propTypes from "./ManageCaseDetails.propTypes.js";
import useStyles from "./ManageCaseDetails.styles.js";

const ManageCaseDetails = ({
  caseworkers,
  caseDetails,
  setCaseDetails,
  closeModal,
  onMarkAsActioned,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext) || {};

  return (
    <section>
      <h3 className={classes.heading}>{iln.gettext("Case Details")}</h3>
      <AssignedCaseworker
        name="assignedTo"
        value={caseDetails.assignedTo}
        onChange={({ target: { name, value } }) => {
          const newValue = { [name]: value };
          setCaseDetails({ ...caseDetails, ...newValue });
          api
            .updateCase(caseDetails.id, newValue, modalActions, iln)
            .catch(() => setCaseDetails({ ...caseDetails }));
        }}
        caseworkers={caseworkers}
        customClassNames={{ container: classes.caseDetailSpacing }}
      />
      <TagInput
        name="tags"
        value={caseDetails.tags}
        onChange={({
          target: {
            name,
            value: { chips },
          },
        }) => {
          const newValue = { [name]: chips };
          setCaseDetails({ ...caseDetails, ...newValue });
          api
            .updateCase(
              caseDetails.id,
              { [name]: chips.map(({ id }) => id) },
              modalActions,
              iln
            )
            .catch(() => setCaseDetails({ ...caseDetails }));
        }}
        customClassNames={{ container: classes.caseDetailSpacing }}
      />
      {activePermissionsSystem && (
        <PermissionsChipInput
          name="restrictions"
          value={caseDetails.restrictions}
          onChange={({ target: { name, value } }) => {
            const newValue = { [name]: value };
            setCaseDetails({ ...caseDetails, ...newValue });

            api
              .updateCase(caseDetails.id, newValue, modalActions, iln)
              .catch(() => setCaseDetails({ ...caseDetails }));
          }}
          customClassNames={{ container: classes.caseDetailSpacing }}
        />
      )}
      <StatusSelect
        name="status"
        value={caseDetails.status}
        onChange={({ target: { name, value } }) => {
          const newValue = { [name]: value };

          if (value === "closeAndMarkActioned") {
            onMarkAsActioned();
            newValue.status = 2;
          } else {
            setCaseDetails({ ...caseDetails, ...newValue });
          }

          api.updateCase(caseDetails.id, newValue, modalActions, iln);
          closeModal && closeModal();
        }}
        includeCloseAndMarkActioned={!!onMarkAsActioned}
        selectedCategoryId={caseDetails?.category}
      />
    </section>
  );
};

ManageCaseDetails.propTypes = propTypes;

export default ManageCaseDetails;
