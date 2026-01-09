import { ModalContext, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CreateCase from "../../../../../../../../common/CreateCase/index.js";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./CreateCaseFromInbox.propTypes.js";
import { useReduxSlice } from "./CreateCaseFromInbox.redux.js";
import { useStyles } from "./CreateCaseFromInbox.styles.js";

const CreateCaseFromInbox = ({ constituent, emailID, onClickBack }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);

  const { focusedItem, updateItem, caseworkers } = useReduxSlice();

  return (
    <main className={classes.main}>
      <div className={classes.header}>
        {constituent.surname ||
        constituent.firstName ||
        constituent.organisation ? (
          <span>
            {iln.gettext("Create new case for")}{" "}
            <a
              href={`/viewconstituent.php?constituentID=${constituent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {constituent.isOrganisation
                ? constituent.organisation || ""
                : `${constituent.title || ""} ${constituent.firstName || ""} ${
                    constituent.surname || ""
                  }`}
            </a>
          </span>
        ) : (
          iln.gettext("Create new Case")
        )}
      </div>
      <CreateCase
        constituentID={constituent.id}
        createButtonText={iln.gettext("Create Case and Assign Email")}
        onCreateCase={({ id: caseID }) => {
          api.updateEmail({ emailID, caseID }, modalActions, iln).then(() => {
            updateItem({ ...focusedItem, caseID });
            sliderActions.close();
          });
        }}
        cancelButtonText={iln.gettext("Back")}
        onCancelClick={onClickBack}
        caseworkers={caseworkers}
      />
    </main>
  );
};

CreateCaseFromInbox.propTypes = propTypes;

export default CreateCaseFromInbox;
