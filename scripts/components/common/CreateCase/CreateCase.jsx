import { Button, FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CaseDetailsForm from "../CreateCaseForm";
import CaseTemplateAutoComplete from "./CaseTemplateAutoComplete";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import localStorageHelper from "../../../helpers/localStorageHelper";
import modifyCreateCaseDetailsForBackend from "../../../helpers/modifyCreateCaseDetailsForBackend";
import propTypes from "./CreateCase.propTypes";
import useCaseDetails from "./hooks/useCaseDetails";
import useStyles from "./CreateCase.styles";

const CreateCase = ({
  constituentID,
  createButtonText,
  onCreateCase, // Creates the case with the selected details and returns the created case
  onCreateClick, // Without creating a case returns the selected case details
  cancelButtonText,
  onCancelClick,
  caseworkers,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [caseDetails, setCaseDetails] = useCaseDetails();
  const [fetching, setFetching] = useState(false);

  return (
    <React.Fragment>
      <CaseTemplateAutoComplete
        onTemplateSelect={(template) => setCaseDetails(template)}
        customClassNames={{ container: classes.spacing }}
      />
      <CaseDetailsForm
        caseworkers={caseworkers}
        constituentID={constituentID}
        caseDetails={caseDetails}
        setCaseDetails={setCaseDetails}
      />
      <FlexBox hAlign={onCancelClick ? "space-between" : "flex-end"}>
        {onCancelClick && (
          <Button onClick={onCancelClick}>
            {cancelButtonText || iln.gettext("Cancel")}
          </Button>
        )}
        <Button
          className={classes.createCaseButton}
          isDisabled={fetching}
          onClick={async () => {
            setFetching(true);
            localStorageHelper.setItem("lastCreatedCase", caseDetails);

            if (constituentID) {
              api
                .createCase({
                  ...modifyCreateCaseDetailsForBackend(caseDetails),
                  constituentID,
                })
                .then(
                  (createdCase) => onCreateCase && onCreateCase(createdCase)
                )
                .finally(() => {
                  setTimeout(() => setFetching(false), 500);
                });
            }

            if (onCreateClick) {
              onCreateClick(caseDetails);
              setFetching(false);
            }
          }}
        >
          {fetching ? (
            <Spinner />
          ) : (
            createButtonText || iln.gettext("Create Case")
          )}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

CreateCase.propTypes = propTypes;

export default CreateCase;
