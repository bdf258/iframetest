import { Placeholder, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CaseworkerSelect from "../../../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import TranslationContext from "../../../../../../../context/translation/TranslationContext.js";
import { anyoneInboxID } from "../../../../Header/Filters/UserSelect/UserSelect.jsx";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import { useReduxSlice } from "./AssignedTo.redux.js";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const AssignedTo = ({ assignedTo, emailID }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [loading, setLoading] = useState(false);

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(TranslationContext);

  const { caseworkers, updateItem, removeItem, selectedInboxID } =
    useReduxSlice();

  return (
    <div className={classes.assignedTo}>
      <div className={classes.label}>{iln.gettext("Assigned to:")}</div>
      <div className={classes.assignedSelectWrapper}>
        {!caseworkers ? (
          <Placeholder height={32} width={300} />
        ) : loading ? (
          <Spinner />
        ) : (
          <CaseworkerSelect
            includeUnassignedOption
            name="assignedTo"
            value={assignedTo}
            label={null}
            onChange={({ target: { value: newValue } }) => {
              if (loading) return;

              if (parseInt(newValue) !== parseInt(assignedTo)) {
                setLoading(true);

                api
                  .updateEmailAssignedTo(emailID, newValue, modalActions, iln)
                  .then(() => {
                    // If currently in the anyone's inbox: update
                    // else: remove
                    if (selectedInboxID === anyoneInboxID) {
                      updateItem({
                        id: emailID,
                        assignedTo: newValue,
                      });
                    } else {
                      removeItem(emailID);
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }
            }}
            caseworkers={caseworkers}
          />
        )}
      </div>
    </div>
  );
};

AssignedTo.propTypes = propTypes;

export default AssignedTo;
