import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext, useRef, useState } from "react";
import { isNumber, isTagValidLength } from "../../../helpers/formValidators";

import { PropTypes } from "prop-types";
import TagListPropType from "../../../types/TagList";
import api from "@electedtech/api";
import debounce from "../../../util/helper-functions";

const handleNextStep = (setInputValue, nextStep) => {
  setInputValue(null);
  nextStep();
};

const matchingTags = (tagName, tagList) => {
  if (tagName && tagList.length > 0) {
    return !!tagList.find((tag) => tag.tag === tagName);
  }
};

const validateRenamingTag = (
  e,
  setInputValue,
  tagList,
  setErrorMessage,
  setIsInputValid,
  setIsLoading
) => {
  const numberOfTagsToDelete = e.target.value;
  if (numberOfTagsToDelete === "") {
    setInputValue("");
    setErrorMessage("Input required");
    setIsInputValid(false);
    setIsLoading(false);
  } else if (isNumber(numberOfTagsToDelete)) {
    setInputValue(numberOfTagsToDelete);
    if (numberOfTagsToDelete.length >= 1) {
      if (
        parseInt(numberOfTagsToDelete, 10) === parseInt(tagList[0].count, 10)
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
  tagName,
  setNewTagName,
  setInputValue,
  setErrorMessage,
  setIsInputValid,
  setIsLoading,
  debounceOnChange
) => {
  setNewTagName(tagName);
  setInputValue(tagName);
  setErrorMessage(null);
  setIsInputValid(false);
  setIsLoading(false);
  debounceOnChange(tagName);
};

const onChange = (tagName, setIsLoading, setErrorMessage, setIsInputValid) => {
  if (isTagValidLength(tagName, 2)) {
    setIsLoading(true);
    api.searchTags({ term: tagName }).then((tagList) => {
      if (matchingTags(tagName, tagList)) {
        setErrorMessage("Tag name matches existing tag");
        setIsInputValid(false);
        setIsLoading(false);
      } else {
        setErrorMessage(null);
        setIsInputValid(true);
        setIsLoading(false);
      }
    });
  } else {
    setErrorMessage("Tags must be at least 2 characters in length");
    setIsInputValid(false);
    setIsLoading(false);
  }
};

const saveEdit = async (
  setButtonDisable,
  tagList,
  newTagName,
  modalActions,
  setActionSummary,
  setTagList,
  setInputValue,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);
  try {
    const res = await api.updateTag(
      { id: tagList[0].id, tag: newTagName },
      modalActions
    );
    setActionSummary(res || {});
    setTagList([]);
    handleNextStep(setInputValue, nextStep);
  } catch (e) {
    resetWizard();
  }
};

const EditTag = ({
  currentStep,
  nextStep,
  resetWizard,
  tagList,
  setTagList,
  setActionSummary,
  newTagName,
  setNewTagName,
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
        label="Tag name"
        name="tagName"
        loading={isLoading}
        onChange={(e) =>
          handleOnChange(
            e.target.value,
            setNewTagName,
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
          tagList.length > 0
            ? `This will rename the tag on ${tagList[0].count > 1 ? "all" : ""} 
        ${tagList.length > 0 ? tagList[0].count : 0} ${
                tagList[0].count > 1 ? "cases" : "cases"
              }`
            : ""
        }
      />
      <p>
        Please confirm you wish to <strong>rename a tag</strong> which is{" "}
        displayed on{" "}
        <strong>
          {tagList.length > 0 ? tagList[0].count : 0}{" "}
          {tagList.length > 0 && tagList[0].count <= 1 ? "case" : "cases"}{" "}
        </strong>
        by typing the number of affected cases below:
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
            validateRenamingTag(
              e,
              setInputValue,
              tagList,
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
                tagList,
                newTagName,
                modalActions,
                setActionSummary,
                setTagList,
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

EditTag.propTypes = {
  currentStep: PropTypes.number.isRequired,
  newTagName: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setNewTagName: PropTypes.func,
  setTagList: PropTypes.func.isRequired,
  tagList: TagListPropType,
};

export default EditTag;
