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
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { SortedHeader, getSortMethod } from "../common/TableSort/TableSort.jsx";

import FlagListPropType from "../../types/FlagList";
import PropTypes from "prop-types";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getTotalFlagCountForConstituents } from "../../helpers/flags";
import { isNumber } from "../../helpers/formValidators";
import useStyles from "./flagManager.styles.js";

const handleOnChange = (
  flagName,
  flagList,
  setInputValue,
  setErrorMessage,
  setIsInputValid,
  setIsLoading
) => {
  if (flagName === "") {
    setInputValue("");
    setErrorMessage("Input required");
    setIsInputValid(false);
    setIsLoading(false);
  } else if (isNumber(flagName)) {
    setInputValue(flagName);
    setErrorMessage(null);
    setIsInputValid(false);
    setIsLoading(false);
    if (parseInt(flagName, 10) === getTotalFlagCountForConstituents(flagList)) {
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

const handleNextStep = (setFlagList, nextStep) => {
  setFlagList([]);
  nextStep();
};

const deleteFlags = async (
  setButtonDisable,
  flagList,
  setFlagList,
  modalActions,
  setActionSummary,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);
  const requestBody = {
    idsToBeDeleted: flagList.map((flag) => flag.id),
  };
  try {
    const res = await api.deleteBulkFlags(requestBody, modalActions);
    setActionSummary(res);
    handleNextStep(setFlagList, nextStep);
  } catch (e) {
    resetWizard();
  }
};

const DeleteFlag = ({
  currentStep,
  nextStep,
  resetWizard,
  flagList,
  setFlagList,
  setActionSummary,
}) => {
  const [isLoading, setIsLoading] = useState(null);
  const [isInputValid, setIsInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const { modalActions } = useContext(ModalContext);
  const [sorted, setSorted] = useState({
    sortBy: "label",
    sortType: "string",
    ascending: true,
  });

  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const stepTwo = (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <SortedHeader
              sortBy={"label"}
              sortType={"string"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Flag")}
            </SortedHeader>
            <SortedHeader
              sortBy={"count"}
              sortType={"number"}
              sorted={sorted}
              setSorted={setSorted}
            >
              {iln.gettext("Count")}
            </SortedHeader>
          </TableHead>
          <TableBody>
            {flagList.sort(getSortMethod(sorted)).map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className={classes.tableCell}>{row.label}</TableCell>
                <TableCell className={classes.tableCell}>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <NotificationBox
        type="info"
        alertMessage={`${getTotalFlagCountForConstituents(
          flagList
        )} flags will be removed. Type ${getTotalFlagCountForConstituents(
          flagList
        )} below to confirm.`}
      />
      <FormTextInput
        error={errorMessage}
        label="Delete flag"
        name="deleteFlag"
        loading={isLoading}
        onChange={(e) =>
          handleOnChange(
            e.target.value,
            flagList,
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
        alertMessage={`${getTotalFlagCountForConstituents(
          flagList
        )} flags will be deleted`}
      />
      <FlexBox hAlign={"space-between"}>
        <Button isDisabled={buttonDisable} onClick={() => resetWizard()}>
          Undo
        </Button>
        <Button
          isDisabled={buttonDisable}
          onClick={() =>
            deleteFlags(
              setButtonDisable,
              flagList,
              setFlagList,
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

DeleteFlag.propTypes = {
  currentStep: PropTypes.number,
  flagList: FlagListPropType,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setFlagList: PropTypes.func.isRequired,
};

export default DeleteFlag;
