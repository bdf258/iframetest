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
  TableHeader,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useRef, useState } from "react";
import {
  getMatchingTag,
  getTotalTagCountForCases,
  removeDuplicateTags,
} from "../../../helpers/tags";
import {
  isNumber,
  isTagValidLength,
  isValidLength,
} from "../../../helpers/formValidators";

import { PropTypes } from "prop-types";
import TagListPropType from "../../../types/TagList";
import api from "@electedtech/api";
import debounce from "../../../util/helper-functions";

const validateRenamingTag = (
  inputValue,
  setInputValue,
  setErrorMessage,
  setInputValid,
  setLoading,
  tagList
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
      if (parseInt(inputValue, 10) === getTotalTagCountForCases(tagList)) {
        setErrorMessage(null);
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
  setTagList,
  tagList,
  tagToMergeInto,
  nextStep
) => {
  setErrorMessage(null);
  setInputValid(false);
  setLoading(false);
  setTagList(removeDuplicateTags(tagList, tagToMergeInto));
  nextStep();
};

const getStatusMessage = (isNewTag, tagToMergeInto, tagList) => {
  return isNewTag
    ? `${getTotalTagCountForCases(
        tagList
      )} tags will be merged into a new tag called: ${tagToMergeInto.tag}`
    : `${getTotalTagCountForCases(
        tagList
      )} tags will be merged into an existing tag called: ${
        tagToMergeInto.tag
      }`;
};

const handleMergeTags = async (
  setButtonDisable,
  tagList,
  tagToMergeInto,
  setActionSummary,
  setTagList,
  nextStep,
  resetWizard
) => {
  setButtonDisable(true);

  try {
    const res = await api.mergeTags(
      { idsToBeMerged: tagList.map((tag) => tag.id), tagToMergeInto },
      ModalContext
    );
    setActionSummary(res);
    setTagList([]);
    nextStep();
  } catch (e) {
    resetWizard();
  }
};

const onChange = (
  searchTerm,
  setTagToMergeInto,
  setErrorMessage,
  setInputValid,
  setLoading,
  setIsNewTag
) => {
  setTagToMergeInto({
    tag: searchTerm.label ? searchTerm.label : searchTerm,
    id: searchTerm.id ? searchTerm.id : 0,
  });

  if (isTagValidLength(searchTerm, 2)) {
    setLoading(true);
    api.searchTags({ term: searchTerm }).then((tagList) => {
      if (tagList.length <= 0) {
        setErrorMessage(null);
        setInputValid(true);
        setLoading(false);
        setIsNewTag(true);
      } else {
        const matchingTag = getMatchingTag(searchTerm, tagList);
        if (matchingTag) {
          setErrorMessage(
            `Tag already exists, this will merge your selected tags with the existing tag: ${matchingTag.tag}`
          );
          setInputValid(true);
          setLoading(false);
          setIsNewTag(false);
          setTagToMergeInto(matchingTag);
        } else {
          setErrorMessage(null);
          setInputValid(true);
          setLoading(false);
          setIsNewTag(true);
          setTagToMergeInto({
            tag: searchTerm,
            id: 0,
          });
        }
      }
    });
  } else {
    setErrorMessage("Tags must be at least 2 characters in length");
    setInputValid(false);
    setLoading(false);
  }
};

const handleResultClick = (
  selectedTag,
  setTagToMergeInto,
  setErrorMessage,
  setInputValid,
  setLoading,
  debounceOnChange
) => {
  setErrorMessage(null);
  setInputValid(false);
  setLoading(false);
  setTagToMergeInto(null);
  debounceOnChange(selectedTag.label);
};

const handleOnChange = (
  input,
  setTagToMergeInto,
  setErrorMessage,
  setInputValid,
  setLoading,
  debounceOnChange
) => {
  setErrorMessage(null);
  setInputValid(false);
  setLoading(false);
  setTagToMergeInto(null);
  debounceOnChange(input);
};

const MergeTag = ({
  nextStep,
  resetWizard,
  currentStep,
  tagList,
  setTagList,
  setActionSummary,
  tagToMergeInto,
  setTagToMergeInto,
  isNewTag,
  setIsNewTag,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputValid, setInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const debounceOnChange = useRef(
    debounce(
      (e) =>
        onChange(
          e,
          setTagToMergeInto,
          setErrorMessage,
          setInputValid,
          setLoading,
          setIsNewTag
        ),
      500
    )
  ).current;

  const stepTwo = (
    <React.Fragment>
      <NotificationBox
        alertMessage={"What do you want to merge your tags in to?"}
        type={"info"}
      />
      <div>
        <AutoComplete
          clearInputOnBlur={false}
          canDisplayError={true}
          placeholder={"New tag name"}
          dataSource={tagList}
          errorText={errorMessage}
          onResultClick={(e) =>
            handleResultClick(
              e,
              setTagToMergeInto,
              setErrorMessage,
              setInputValid,
              setLoading,
              debounceOnChange
            )
          }
          onInputChange={(e) =>
            handleOnChange(
              e,
              setTagToMergeInto,
              setErrorMessage,
              setInputValid,
              setLoading,
              debounceOnChange,
              setIsNewTag
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
                setTagList,
                tagList,
                tagToMergeInto,
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
      {tagToMergeInto && (
        <NotificationBox
          alertMessage={getStatusMessage(isNewTag, tagToMergeInto, tagList)}
          type={"info"}
        />
      )}
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
      <p>
        To confirm merging of tags type{" "}
        <strong>{getTotalTagCountForCases(tagList)}</strong> in the input below
        and click the merge button
      </p>
      <div>
        <FormTextInput
          error={errorMessage}
          label="Merge tags"
          name="tagName"
          loading={loading}
          onChange={(e) =>
            validateRenamingTag(
              e.target.value,
              setInputValue,
              setErrorMessage,
              setInputValid,
              setLoading,
              tagList
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
              handleMergeTags(
                setButtonDisable,
                tagList,
                tagToMergeInto,
                setActionSummary,
                setTagList,
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

MergeTag.propTypes = {
  currentStep: PropTypes.number.isRequired,
  isNewTag: PropTypes.bool,
  nextStep: PropTypes.func.isRequired,
  resetWizard: PropTypes.func.isRequired,
  setActionSummary: PropTypes.func.isRequired,
  setIsNewTag: PropTypes.func,
  setTagList: PropTypes.func.isRequired,
  setTagToMergeInto: PropTypes.func,
  tagList: TagListPropType,
  tagToMergeInto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
  }),
};

export default MergeTag;
