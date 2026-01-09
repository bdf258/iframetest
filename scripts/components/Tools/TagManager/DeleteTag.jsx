import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  NotificationBox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import PropTypes from "prop-types";
import TagListPropType from "../../../types/TagList";
import api from "@electedtech/api";
import { getTotalTagCountForCases } from "../../../helpers/tags";
import { isNumber } from "../../../helpers/formValidators";

const handleOnChange = (
  tagName,
  tagList,
  setInputValue,
  setErrorMessage,
  setIsInputValid,
  setIsLoading
) => {
  if (tagName === "") {
    setInputValue("");
    setErrorMessage("Input required");
    setIsInputValid(false);
    setIsLoading(false);
  } else if (isNumber(tagName)) {
    setInputValue(tagName);
    setErrorMessage(null);
    setIsInputValid(false);
    setIsLoading(false);
    if (parseInt(tagName, 10) === getTotalTagCountForCases(tagList)) {
      setErrorMessage(null);
      setIsInputValid(true);
      setIsLoading(false);
    } else {
      setErrorMessage("Input does not match");
      setIsInputValid(false);
      setIsLoading(false);
    }
  }
};

const handleNextStep = (setTagList, nextStep) => {
  setTagList([]);
  nextStep();
};

const deleteTags = async (
  setButtonDisable,
  tagList,
  setTagList,
  modalActions,
  setActionSummary,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);
  const requestBody = {
    idsToBeDeleted: tagList.map((tag) => tag.id),
  };
  try {
    const res = await api.deleteBulkTags(requestBody, modalActions);
    setActionSummary(res);
    handleNextStep(setTagList, nextStep);
  } catch (e) {
    resetWizard();
  }
};

const DeleteTag = ({
  currentStep,
  nextStep,
  resetWizard,
  tagList,
  setTagList,
  setActionSummary,
}) => {
  const [isLoading, setIsLoading] = useState(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const { modalActions } = useContext(ModalContext);

  const stepTwo = (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableHeader>Tag</TableHeader>
            <TableHeader>Count</TableHeader>
          </TableHead>
          <TableBody>
            {tagList.map((tag, idx) => (
              <TableRow key={idx}>
                <TableCell textAlign="center" verticalAlign="middle">
                  {tag.label}
                </TableCell>
                <TableCell textAlign="center" verticalAlign="middle">
                  {tag.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <NotificationBox
        type="info"
        alertMessage={`${getTotalTagCountForCases(
          tagList
        )} tags will be removed. Type ${getTotalTagCountForCases(
          tagList
        )} below to confirm.`}
      />
      <FormTextInput
        error={errorMessage}
        label="Delete tag"
        name="deleteTag"
        loading={isLoading}
        onChange={(e) =>
          handleOnChange(
            e.target.value,
            tagList,
            setInputValue,
            setErrorMessage,
            setIsInputValid,
            setIsLoading
          )
        }
        value={inputValue}
      />
      <FlexBox hAlign={"space-between"}>
        <Button onClick={() => resetWizard()}>Cancel</Button>
        <Button isDisabled={!isInputValid} onClick={() => nextStep()}>
          Next
        </Button>
      </FlexBox>
    </React.Fragment>
  );

  const stepThree = (
    <React.Fragment>
      <NotificationBox
        type="info"
        alertMessage={`${getTotalTagCountForCases(
          tagList
        )} tags will be deleted`}
      />
      <FlexBox hAlign={"space-between"}>
        <Button isDisabled={buttonDisable} onClick={() => resetWizard()}>
          Undo
        </Button>
        <Button
          isDisabled={buttonDisable}
          onClick={() =>
            deleteTags(
              setButtonDisable,
              tagList,
              setTagList,
              modalActions,
              setActionSummary,
              nextStep,
              resetWizard
            )
          }
        >
          Confirm
        </Button>
      </FlexBox>
    </React.Fragment>
  );

  return (
    <React.Fragment>{currentStep === 1 ? stepTwo : stepThree}</React.Fragment>
  );
};

DeleteTag.propTypes = {
  currentStep: PropTypes.number,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setTagList: PropTypes.func.isRequired,
  tagList: TagListPropType,
};

export default DeleteTag;
