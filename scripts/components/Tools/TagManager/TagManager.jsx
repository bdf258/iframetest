import { Heading, Stepper } from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import ButtonBar from "./ButtonBar.jsx";
import Confirmation from "./Confirmation.jsx";
import DeleteTag from "./DeleteTag.jsx";
import EditTag from "./EditTag.jsx";
import MergeTag from "./MergeTag.jsx";
import SearchDisplayTag from "./SearchDisplayTag.jsx";

const resetWizard = (setState, initialState) => {
  setState(initialState);
};

const nextStep = (setCurrentStep, currentStep) => {
  setCurrentStep({
    ...currentStep,
    currentStep: ++currentStep.currentStep,
  });
};

const getCurrentActionUi = (currentStep, deleteTag, editTag, mergeTag) => {
  switch (currentStep.currentAction) {
    case "delete":
      return deleteTag;
    case "edit":
      return editTag;
    case "merge":
      return mergeTag;
    default: {
      return null;
    }
  }
};

const TagManager = () => {
  const initialWizardState = {
    currentStep: 0,
    currentAction: null,
  };

  const [tagList, setTagList] = useState([]);
  const [currentStep, setCurrentStep] = useState(initialWizardState);
  const [actionSummary, setActionSummary] = useState(null);
  const [tagToMergeInto, setTagToMergeInto] = useState(null);
  const [isNewTag, setIsNewTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const stepperContainerStyles = { padding: "10px 0 15px" };

  const deleteTag = (
    <DeleteTag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      tagList={tagList}
      setTagList={setTagList}
      setActionSummary={setActionSummary}
    />
  );

  const editTag = (
    <EditTag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      tagList={tagList}
      setTagList={setTagList}
      setActionSummary={setActionSummary}
      newTagName={newTagName}
      setNewTagName={setNewTagName}
    />
  );

  const mergeTag = (
    <MergeTag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      tagList={tagList}
      setTagList={setTagList}
      setActionSummary={setActionSummary}
      tagToMergeInto={tagToMergeInto}
      setTagToMergeInto={setTagToMergeInto}
      isNewTag={isNewTag}
      setIsNewTag={setIsNewTag}
    />
  );

  return (
    <React.Fragment>
      <Heading heading="Tag Manager" size="medium" bold />
      <div
        style={{ margin: "10px 0px 17px 0", borderBottom: "1px solid grey" }}
      />
      <Stepper
        step={currentStep.currentStep}
        progressBar
        progressBarWidth={250}
      >
        <div style={stepperContainerStyles}>
          <div style={{ marginTop: "15px" }}>
            <p>Select tags to manage</p>
            <SearchDisplayTag tagList={tagList} setTagList={setTagList} />
          </div>
          <div style={{ marginTop: "20px" }}>
            <ButtonBar
              nextStep={() => nextStep(setCurrentStep, currentStep)}
              setAction={(newAction) =>
                setCurrentStep({ ...currentStep, currentAction: newAction })
              }
              tagList={tagList}
            />
          </div>
        </div>
        <div style={stepperContainerStyles}>
          {getCurrentActionUi(currentStep, deleteTag, editTag, mergeTag)}
        </div>
        <div style={stepperContainerStyles}>
          {getCurrentActionUi(currentStep, deleteTag, editTag, mergeTag)}
        </div>
        <div style={stepperContainerStyles}>
          <Confirmation
            action={currentStep.currentAction}
            resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
            actionSummary={actionSummary}
          />
        </div>
      </Stepper>
    </React.Fragment>
  );
};
export default TagManager;
