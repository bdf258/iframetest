import { Heading, Stepper } from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import ButtonBar from "./ButtonBar.jsx";
import Confirmation from "./Confirmation.jsx";
import DeleteFlag from "./DeleteFlag.jsx";
import EditFlag from "./EditFlag.jsx";
import MergeFlag from "./MergeFlag.jsx";
import SearchDisplayFlag from "./SearchDisplayFlag.jsx";

const resetWizard = (setState, initialState) => {
  setState(initialState);
};

const nextStep = (setCurrentStep, currentStep) => {
  setCurrentStep({
    ...currentStep,
    currentStep: ++currentStep.currentStep,
  });
};

const getCurrentActionUi = (currentStep, deleteFlag, editFlag, mergeFlag) => {
  switch (currentStep.currentAction) {
    case "delete":
      return deleteFlag;
    case "edit":
      return editFlag;
    case "merge":
      return mergeFlag;
    default: {
      return null;
    }
  }
};

const FlagManager = () => {
  const initialWizardState = {
    currentStep: 0,
    currentAction: null,
  };

  const [flagList, setFlagList] = useState([]);
  const [currentStep, setCurrentStep] = useState(initialWizardState);
  const [actionSummary, setActionSummary] = useState(null);
  const [isNewFlag, setIsNewFlag] = useState(null);
  const [flagToMergeInto, setFlagToMergeInto] = useState(null);
  const [newFlagName, setNewFlagName] = useState("");

  const stepperContainerStyles = { padding: "10px 0 15px" };

  const deleteFlag = (
    <DeleteFlag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      flagList={flagList}
      setFlagList={setFlagList}
      setActionSummary={setActionSummary}
    />
  );

  const editFlag = (
    <EditFlag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      flagList={flagList}
      setFlagList={setFlagList}
      setActionSummary={setActionSummary}
      newFlagName={newFlagName}
      setNewFlagName={setNewFlagName}
    />
  );

  const mergeFlag = (
    <MergeFlag
      resetWizard={() => resetWizard(setCurrentStep, initialWizardState)}
      nextStep={() => nextStep(setCurrentStep, currentStep)}
      currentStep={currentStep.currentStep}
      flagList={flagList}
      setFlagList={setFlagList}
      setActionSummary={setActionSummary}
      flagToMergeInto={flagToMergeInto}
      setFlagToMergeInto={setFlagToMergeInto}
      isNewFlag={isNewFlag}
      setIsNewFlag={setIsNewFlag}
    />
  );

  return (
    <React.Fragment>
      <Heading heading="Flag Manager" size="medium" bold />
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
            <p>Select flags to manage</p>
            <SearchDisplayFlag flagList={flagList} setFlagList={setFlagList} />
          </div>
          <div style={{ marginTop: "20px" }}>
            <ButtonBar
              nextStep={() => nextStep(setCurrentStep, currentStep)}
              setAction={(newAction) =>
                setCurrentStep({ ...currentStep, currentAction: newAction })
              }
              flagList={flagList}
            />
          </div>
        </div>
        <div style={stepperContainerStyles}>
          {getCurrentActionUi(currentStep, deleteFlag, editFlag, mergeFlag)}
        </div>
        <div style={stepperContainerStyles}>
          {getCurrentActionUi(currentStep, deleteFlag, editFlag, mergeFlag)}
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
export default FlagManager;
