import { ModalContext, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import AssignActions from "../common/AssignActions/AssignActions.jsx";
import AssignedConstituent from "../../../ConstituentAndCase/AssignedConstituent/AssignedConstituent.jsx";
import CaseSelect from "../common/CaseSelect/CaseSelect.jsx";
import Placeholder from "./Placeholder.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./ChangeCase.propTypes.js";
import theme from "@electedtech/theme";
import { useReduxSlice } from "./ChangeCase.redux.js";
import { useStyles } from "../AssignConstituentAndCase.styles.js";

const caseSearchCriteria = {
  pageNo: 1,
  resultsPerPage: "9999",
  statusID: [],
  casetypeID: [],
  categorytypeID: [],
  assignedToID: [],
  return: "columns",
  columnsToReturn: {
    case: ["id", "caseType", "tagged"],
    constituent: [],
  },
  orderBy: "caseID",
  orderByDirection: "DESC",
};

const ChangeCase = ({
  constituent,
  previousConstituent,
  emailID,
  caseID = "",
  onClickCreateCase,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  onClickChooseConstituent,
}) => {
  const classes = useStyles(theme);

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);

  const { focusedItem, updateItem } = useReduxSlice();

  const [selectedCase, setSelectedCase] = useState();
  const [cases, setCases] = useState();

  useEffect(() => {
    api
      .searchCases(
        {
          ...caseSearchCriteria,
          constituentCriteria: { id: [constituent.id] },
        },
        modalActions,
        iln
      )
      .then(({ cases }) => setCases(cases))
      .catch(() => setCases([]));
  }, []);

  return (
    <React.Fragment>
      <p className={classes.centerText}>
        {caseID && previousConstituent?.id === constituent?.id
          ? iln.gettext(
              "The email is already assigned to a case under the constituent"
            )
          : iln.gettext(
              "Create a new case or assign to an existing case under"
            )}{" "}
        <AssignedConstituent constituent={constituent} />{" "}
        {iln.ngettext(
          "who has %1 case listed.",
          "who has %1 cases listed.",
          (cases || []).length
        )}
      </p>
      {cases && cases.length > 0 ? (
        !(cases.length === 1 && cases[0].id === caseID) && (
          <>
            <p className={classes.centerText}>
              {iln.gettext(
                "Select a case from below to reassign this email to that case:"
              )}
            </p>
            <CaseSelect
              value={selectedCase}
              onChange={({ target: { value } }) => {
                setSelectedCase(value);
                value !== undefined &&
                  api
                    .updateEmail({ emailID, caseID: value }, modalActions, iln)
                    .then(() => {
                      updateItem({ ...focusedItem, caseID: value });
                      sliderActions.close();
                    });
              }}
              currentCaseID={caseID}
              cases={cases}
            />
          </>
        )
      ) : cases ? null : (
        <Placeholder />
      )}
      <AssignActions
        onClickCreateCase={onClickCreateCase}
        onClickCreateConstituent={onClickCreateConstituent}
        onClickCreateOrganisation={onClickCreateOrganisation}
        onClickChooseConstituent={onClickChooseConstituent}
      />
    </React.Fragment>
  );
};

ChangeCase.propTypes = propTypes;

export default ChangeCase;
