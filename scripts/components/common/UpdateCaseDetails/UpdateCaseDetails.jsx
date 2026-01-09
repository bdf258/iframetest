import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import ManageCaseDetails from "./ManageCaseDetails/ManageCaseDetails.jsx";
import ManageReviewDates from "./ManageReviewDates/ManageReviewDates.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./UpdateCaseDetails.propTypes.js";
import { useStyles } from "./UpdateCaseDetails.styles.js";

const UpdateCaseDetails = ({
  onModalClose,
  caseworkers,
  casenotes,
  addCasenote,
  updateCasenoteByID,
  caseDetails,
  setCaseDetails,
  closeModal,
  onMarkAsActioned,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  useEffect(() => {
    return () => {
      onModalClose && onModalClose();
    };
  }, []);

  return (
    <React.Fragment>
      <div className={classes.modal}>
        <ManageReviewDates
          caseworkers={caseworkers}
          casenotes={casenotes}
          caseID={caseDetails.id}
          addCasenote={addCasenote}
          updateCasenoteByID={updateCasenoteByID}
        />
        <ManageCaseDetails
          caseworkers={caseworkers}
          caseDetails={caseDetails}
          setCaseDetails={setCaseDetails}
          closeModal={closeModal}
          onMarkAsActioned={onMarkAsActioned}
        />
      </div>
      <FlexBox hAlign="flex-end">
        <Button onClick={closeModal} className={classes.doneButton}>
          {iln?.gettext("Done") || "Done"}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

UpdateCaseDetails.propTypes = propTypes;

export default UpdateCaseDetails;
