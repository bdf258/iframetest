/*eslint-disable*/
import {
  Button,
  FlexBox,
  FormSelect,
  FormSelectAutoComplete,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import { useContext, useState } from "react";

import ConfirmationModal from "../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import React from "react";
import { TranslationContext } from "context/translate";
import propTypes from "./BulkDoorknockingUserActions.propTypes";
import theme from "../../../../../theme";
import { useStyles } from "./BulkDoorknockingUserActions.styles";

export const BulkDoorKnockingUserActions = ({
  surveys,
  users,
  onSave,
  onCancel,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles(theme);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [selectedActivationStatus, setSelectedActivationStatus] = useState();
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [loading, setLoading] = useState(false);

  if (!users)
    return (
      <NotificationBox
        type={"info"}
        alertMessage={iln.gettext("There are no available doorknocking users")}
      />
    );

  if (loading) {
    return (
      <FlexBox hAlign={"center"}>
        <Spinner scale={1} />
      </FlexBox>
    );
  }

  return (
    <React.Fragment>
      &nbsp; &nbsp;
      {!displayConfirmationModal && (
        <React.Fragment>
          <FormSelectAutoComplete
            customClassNames={{ label: classes.inputLabel }}
            label={iln.gettext("Survey")}
            name={"survey_id"}
            placeholder={iln.gettext("Survey")}
            onChange={(e) => {
              setSelectedSurvey(e.target.value);
            }}
          >
            {surveys
              .filter((survey) => survey?.visible === "1")
              .map((survey) => (
                <option key={survey.id} value={survey.id}>
                  {survey.name}
                </option>
              ))}
          </FormSelectAutoComplete>
          <FormSelect
            customClassNames={{ label: classes.inputLabel }}
            name={"active"}
            value={selectedActivationStatus}
            onChange={(e) => setSelectedActivationStatus(e.target.value)}
            label={"Active"}
          >
            <option value={"activate"}>Yes</option>
            <option value={"deactivate"}>No</option>
          </FormSelect>
          <FlexBox hAlign={"space-between"}>
            <Button onClick={() => onCancel()}>{iln.gettext("Cancel")}</Button>
            <Button
              onClick={() => setDisplayConfirmationModal(true)}
              isDisabled={!(selectedSurvey && selectedActivationStatus)}
            >
              {iln.gettext("Confirm")}
            </Button>
          </FlexBox>
        </React.Fragment>
      )}
      {displayConfirmationModal && (
        <ConfirmationModal
          confirmationValue={users.length}
          message={`This action will affect ${users?.length} doorknocker accounts, input the number of doorknockers below to confirm`}
          buttonText={"Confirm"}
          onConfirm={async () => {
            setLoading(true);
            await onSave({
              users,
              selectedSurvey,
              selectedActivationStatus,
            });
            setLoading(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

BulkDoorKnockingUserActions.propTypes = propTypes;
