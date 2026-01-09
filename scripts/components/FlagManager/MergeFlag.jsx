import {
  AutoComplete,
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
import React, { useContext, useRef, useState } from "react";
import { SortedHeader, getSortMethod } from "../common/TableSort/TableSort.jsx";
import {
  getMatchingFlag,
  getTotalFlagCountForConstituents,
  removeDuplicateFlags,
} from "../../helpers/flags";
import {
  isFlagValidLength,
  isNumber,
  isValidLength,
} from "../../helpers/formValidators";

import FlagListPropType from "../../types/FlagList";
import { PropTypes } from "prop-types";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import debounce from "../../util/helper-functions";
import useStyles from "./flagManager.styles.js";

const validateRenamingFlag = (
  inputValue,
  setInputValue,
  setErrorMessage,
  setInputValid,
  setLoading,
  flagList
) => {
  if (inputValue === "") {
    setInputValue("");
    setErrorMessage("Input required");
    setInputValid(false);
    setLoading(false);
  }
  if (isNumber(inputValue)) {
    setInputValue(inputValue);
    if (isValidLength(inputValue, 1)) {
      if (
        parseInt(inputValue, 10) === getTotalFlagCountForConstituents(flagList)
      ) {
        setErrorMessage("");
        setInputValid(true);
        setLoading(false);
      } else {
        setErrorMessage("Input doesnt match");
        setInputValid(false);
        setLoading(false);
      }
    } else {
      setErrorMessage("Input required");
      setInputValid(false);
      setLoading(false);
    }
  }
};

const handleNextStep = (
  setErrorMessage,
  setInputValid,
  setLoading,
  setFlagList,
  flagList,
  flagToMergeInto,
  nextStep
) => {
  setErrorMessage("");
  setInputValid(false);
  setLoading(false);
  setFlagList(removeDuplicateFlags(flagList, flagToMergeInto));
  nextStep();
};

const getStatusMessage = (isNewFlag, flagToMergeInto, flagList) => {
  return isNewFlag
    ? `${getTotalFlagCountForConstituents(
        flagList
      )} flags will be merged into a new flag called: ${flagToMergeInto.flag}`
    : `${getTotalFlagCountForConstituents(
        flagList
      )} flags will be merged into an existing flag called: ${
        flagToMergeInto.flag
      }`;
};

const handleMergeFlags = async (
  setButtonDisable,
  flagList,
  flagToMergeInto,
  setActionSummary,
  setFlagList,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);

  try {
    const res = await api.mergeFlags(
      { idsToBeMerged: flagList.map((flag) => flag.id), flagToMergeInto },
      ModalContext
    );
    setActionSummary(res);
    setFlagList([]);
    nextStep();
  } catch (e) {
    resetWizard();
  }
};

const onChange = (
  searchTerm,
  setFlagToMergeInto,
  setErrorMessage,
  setInputValid,
  setLoading,
  setSearchResults,
  setIsNewFlag
) => {
  setFlagToMergeInto({
    flag: searchTerm.label ? searchTerm.label : searchTerm,
    id: searchTerm.id ? searchTerm.id : 0,
  });

  if (isFlagValidLength(searchTerm, 2)) {
    setLoading(true);
    api.searchFlags({ term: searchTerm }).then((flagList) => {
      setSearchResults(flagList);
      if (flagList.length <= 0) {
        setErrorMessage("");
        setInputValid(true);
        setLoading(false);
        setIsNewFlag(true);
      } else {
        const matchingFlag = getMatchingFlag(searchTerm, flagList);
        if (matchingFlag) {
          setErrorMessage(
            `Flag already exists, this will merge your selected flags with the existing flag: ${matchingFlag.flag}`
          );
          setInputValid(true);
          setLoading(false);
          setIsNewFlag(false);
          setFlagToMergeInto(matchingFlag);
        } else {
          setErrorMessage("");
          setInputValid(true);
          setLoading(false);
          setIsNewFlag(true);
          setFlagToMergeInto({
            flag: searchTerm,
            id: 0,
          });
        }
      }
    });
  } else {
    setErrorMessage("Flags must be at least 2 characters in length");
    setInputValid(false);
    setLoading(false);
  }
};

const handleResultClick = (
  selectedFlag,
  setErrorMessage,
  setInputValid,
  setLoading,
  setIsNewFlag,
  setFlagToMergeInto,
  debounceOnChange
) => {
  setFlagToMergeInto(selectedFlag);
  setErrorMessage("");
  setInputValid(true);
  setLoading(true);
  setIsNewFlag(false);
  debounceOnChange(selectedFlag.label);
};

const handleOnChange = (
  input,
  setFlagToMergeInto,
  setErrorMessage,
  setInputValid,
  setLoading,
  debounceOnChange
) => {
  setErrorMessage("");
  setInputValid(false);
  setLoading(false);
  setFlagToMergeInto(null);
  debounceOnChange(input);
};

const MergeFlag = ({
  nextStep,
  resetWizard,
  currentStep,
  flagList,
  setFlagList,
  setActionSummary,
  flagToMergeInto,
  setFlagToMergeInto,
  isNewFlag,
  setIsNewFlag,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [, setSearchResults] = useState([]);
  const [sorted, setSorted] = useState({
    sortBy: "label",
    sortType: "string",
    ascending: true,
  });
  const iln = useContext(TranslationContext);

  const classes = useStyles();

  const debounceOnChange = useRef(
    debounce(
      (e) =>
        onChange(
          e,
          setFlagToMergeInto,
          setErrorMessage,
          setInputValid,
          setLoading,
          setSearchResults,
          setIsNewFlag
        ),
      1000
    )
  ).current;

  const stepTwo = (
    <React.Fragment>
      <NotificationBox
        alertMessage={"What do you want to merge your flags in to?"}
        type={"info"}
      />
      <div>
        <AutoComplete
          clearInputOnBlur={false}
          canDisplayError={true}
          placeholder={"New flag name"}
          dataSource={flagList}
          errorText={errorMessage}
          onResultClick={(e) =>
            handleResultClick(
              e,
              setErrorMessage,
              setInputValid,
              setLoading,
              setIsNewFlag,
              setFlagToMergeInto,
              debounceOnChange
            )
          }
          onInputChange={(e) =>
            handleOnChange(
              e,
              setFlagToMergeInto,
              setErrorMessage,
              setInputValid,
              setLoading,
              debounceOnChange,
              setIsNewFlag
            )
          }
          loading={loading}
        />
      </div>
      <div style={{ marginTop: "25px" }}>
        <FlexBox hAlign={"space-between"}>
          <Button onClick={() => resetWizard()}>Cancel</Button>
          <Button
            isDisabled={!inputValid || loading}
            onClick={() =>
              handleNextStep(
                setErrorMessage,
                setInputValid,
                setLoading,
                setFlagList,
                flagList,
                flagToMergeInto,
                nextStep
              )
            }
          >
            Merge
          </Button>
        </FlexBox>
      </div>
    </React.Fragment>
  );

  const stepThree = (
    <React.Fragment>
      {flagToMergeInto && (
        <NotificationBox
          alertMessage={getStatusMessage(isNewFlag, flagToMergeInto, flagList)}
          type={"info"}
        />
      )}
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
      <p>
        To confirm merging of flags type{" "}
        <strong>{getTotalFlagCountForConstituents(flagList)}</strong> in the
        input below and click the merge button
      </p>
      <div>
        <FormTextInput
          error={errorMessage}
          label="Merge flags"
          name="flagName"
          loading={loading}
          onChange={(e) =>
            validateRenamingFlag(
              e.target.value,
              setInputValue,
              setErrorMessage,
              setInputValid,
              setLoading,
              flagList
            )
          }
          value={inputValue}
        />
      </div>
      <div style={{ marginTop: "25px" }}>
        <FlexBox hAlign={"space-between"}>
          <Button onClick={() => resetWizard()}>Cancel</Button>
          <Button
            isDisabled={!inputValid || buttonDisable}
            onClick={() =>
              handleMergeFlags(
                setButtonDisable,
                flagList,
                flagToMergeInto,
                setActionSummary,
                setFlagList,
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

MergeFlag.propTypes = {
  currentStep: PropTypes.number.isRequired,
  flagList: FlagListPropType,
  flagToMergeInto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    flag: PropTypes.string.isRequired,
  }),
  isNewFlag: PropTypes.bool,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setFlagList: PropTypes.func.isRequired,
  setFlagToMergeInto: PropTypes.func,
  setIsNewFlag: PropTypes.func,
};

export default MergeFlag;
