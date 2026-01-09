import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext, useRef, useState } from "react";
import { isFlagValidLength, isNumber } from "../../helpers/formValidators";

import FlagListPropType from "../../types/FlagList";
import { PropTypes } from "prop-types";
import api from "@electedtech/api";
import debounce from "../../util/helper-functions";

const handleNextStep = (setInputValue, nextStep) => {
  setInputValue(null);
  nextStep();
};

const matchingFlags = (flagName, flagList) => {
  if (flagName && flagList.length > 0) {
    return !!flagList.find((flag) => flag.flag === flagName);
  }
};

const validateRenamingFlag = (
  e,
  setInputValue,
  flagList,
  setErrorMessage,
  setIsInputValid,
  setIsLoading
) => {
  const numberOfFlagsToDelete = e.target.value;
  if (numberOfFlagsToDelete === "") {
    setInputValue("");
    setErrorMessage("Input required");
    setIsInputValid(false);
    setIsLoading(false);
  } else if (isNumber(numberOfFlagsToDelete)) {
    setInputValue(numberOfFlagsToDelete);
    if (numberOfFlagsToDelete.length >= 1) {
      if (
        parseInt(numberOfFlagsToDelete, 10) === parseInt(flagList[0].count, 10)
      ) {
        setErrorMessage(null);
        setIsInputValid(true);
        setIsLoading(false);
      } else {
        setErrorMessage("Input doesnt match");
        setIsInputValid(false);
        setIsLoading(false);
      }
    } else {
      setErrorMessage("Input required");
      setIsInputValid(false);
      setIsLoading(false);
    }
  }
};

const handleOnChange = (
  flagName,
  setNewFlagName,
  setInputValue,
  setErrorMessage,
  setIsInputValid,
  setIsLoading,
  debounceOnChange
) => {
  setNewFlagName(flagName);
  setInputValue(flagName);
  setErrorMessage(null);
  setIsInputValid(false);
  setIsLoading(false);
  debounceOnChange(flagName);
};

const onChange = (flagName, setIsLoading, setErrorMessage, setIsInputValid) => {
  if (isFlagValidLength(flagName, 2)) {
    setIsLoading(true);
    api.searchFlags({ term: flagName }).then((flagList) => {
      if (matchingFlags(flagName, flagList)) {
        setErrorMessage("Flag name matches existing flag");
        setIsInputValid(false);
        setIsLoading(false);
      } else {
        setErrorMessage(null);
        setIsInputValid(true);
        setIsLoading(false);
      }
    });
  } else {
    setErrorMessage("Flags must be at least 2 characters in length");
    setIsInputValid(false);
    setIsLoading(false);
  }
};

const saveEdit = async (
  setButtonDisable,
  flagList,
  newFlagName,
  modalActions,
  setActionSummary,
  setFlagList,
  setInputValue,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);
  try {
    const res = await api.updateFlag(
      { id: flagList[0].id, flag: newFlagName },
      modalActions
    );
    setActionSummary(res || {});
    setFlagList([]);
    handleNextStep(setInputValue, nextStep);
  } catch (e) {
    resetWizard();
  }
};

const EditFlag = ({
  currentStep,
  nextStep,
  resetWizard,
  flagList,
  setFlagList,
  setActionSummary,
  newFlagName,
  setNewFlagName,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const { modalActions } = useContext(ModalContext);

  const debounceWaitTimeMs = 500;

  const debounceOnChange = useRef(
    debounce(
      (e) => onChange(e, setIsLoading, setErrorMessage, setIsInputValid),
      debounceWaitTimeMs
    )
  ).current;

  const stepTwo = (
    <React.Fragment>
      <FormTextInput
        error={errorMessage}
        label="Flag name"
        name="flagName"
        loading={isLoading}
        onChange={(e) =>
          handleOnChange(
            e.target.value,
            setNewFlagName,
            setInputValue,
            setErrorMessage,
            setIsInputValid,
            setIsLoading,
            debounceOnChange
          )
        }
        value={inputValue}
      />
      <div style={{ marginTop: "25px" }}>
        <FlexBox hAlign={"space-between"}>
          <Button onClick={() => resetWizard()}>Cancel</Button>
          <Button
            isDisabled={!isInputValid}
            onClick={() => handleNextStep(setInputValue, nextStep)}
          >
            Rename
          </Button>
        </FlexBox>
      </div>
    </React.Fragment>
  );

  const stepThree = (
    <React.Fragment>
      <NotificationBox
        type="info"
        alertMessage={
          flagList.length > 0
            ? `This will rename the flag on ${
                flagList[0].count > 1 ? "all" : ""
              } 
        ${flagList.length > 0 ? flagList[0].count : 0} ${
                flagList[0].count > 1 ? "constituents" : "constituent"
              }`
            : ""
        }
      />
      <p>
        Please confirm you wish to <strong>rename a flag</strong> which is{" "}
        displayed on{" "}
        <strong>
          {flagList.length > 0 ? flagList[0].count : 0}{" "}
          {flagList.length > 0 && flagList[0].count <= 1
            ? "constituent"
            : "constituents"}{" "}
        </strong>
        by typing the number of affected constituents below:
      </p>
      <div>
        <FormTextInput
          error={errorMessage}
          value={inputValue}
          name={"confirmRename"}
          label={"Confirm rename"}
          type="number"
          placeholder="Confirm rename"
          onChange={(e) =>
            validateRenamingFlag(
              e,
              setInputValue,
              flagList,
              setErrorMessage,
              setIsInputValid,
              setIsLoading
            )
          }
        />
      </div>
      <div style={{ marginTop: "25px" }}>
        <FlexBox hAlign={"space-between"}>
          <Button onClick={() => resetWizard()}>Cancel</Button>
          <Button
            isDisabled={!isInputValid || buttonDisable}
            onClick={() =>
              saveEdit(
                setButtonDisable,
                flagList,
                newFlagName,
                modalActions,
                setActionSummary,
                setFlagList,
                setInputValue,
                nextStep,
                resetWizard
              )
            }
          >
            Confirm
          </Button>
        </FlexBox>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>{currentStep === 1 ? stepTwo : stepThree}</React.Fragment>
  );
};

EditFlag.propTypes = {
  currentStep: PropTypes.number.isRequired,
  flagList: FlagListPropType,
  newFlagName: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setFlagList: PropTypes.func.isRequired,
  setNewFlagName: PropTypes.func.isRequired,
};

export default EditFlag;
