import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  NotificationBox,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import DisplayConditionList from "./DisplayConditionList/DisplayConditionList.jsx";
import ParentField from "./ParentField/ParentField.jsx";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import parentFieldOptions from "../DisplayConditionList/util/parentFieldOptions";
import propTypes from "./EditConditionalBlock.propTypes";
import useDisplayConditions from "../DisplayConditionList/ViewDisplayCondition/hooks/useDisplayConditions";
import { useStyles } from "./EditConditionalBlock.styles";

const EditConditionalBlock = ({
  existingConditionalBlock = false,
  modalId,
  displayCondition,
  parent_object,
  handleSaveConditionalBlock,
}) => {
  const [conditionalOption, dispatch] = useDisplayConditions({
    parentObjectField: displayCondition.parentObjectField,
    parentObjectFieldOptions: [...displayCondition.parentObjectFieldOptions],
  });

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const classes = useStyles();

  const { parentObjectField, parentObjectFieldOptions } = conditionalOption;

  const parentObjectForDisplay =
    parent_object === "cases" ? "Cases" : "Constituent";

  const validConditionalBlockErrorMessage = () => {
    if (!parentObjectField) return iln.gettext("Parent object is required");
    if (!parentObjectFieldOptions.length > 0)
      return iln.gettext("At least one display condition is required");
    if (parentObjectFieldOptions.includes(null))
      return iln.gettext(
        "Selecting an option for each display condition is required"
      );
  };

  return (
    <div className={classes.editConditionalBlock}>
      {existingConditionalBlock && (
        <FormTextInput
          customClassNames={{
            label: classes.label,
            container: classnames(
              classes.inputContainer,
              classes.inputDisabled
            ),
            select: classes.caseFieldInput,
          }}
          name={"caseField"}
          value={parentFieldOptions[parent_object][parentObjectField].text}
          label={iln.gettext(`${parentObjectForDisplay} field`)}
          keepErrorSpacing={false}
          disabled
          readonly
        />
      )}
      {!existingConditionalBlock && (
        <ParentField
          existingConditionalBlock={existingConditionalBlock}
          parent_object={parent_object}
          selectedParentField={parentObjectField}
          handleParentObjectSelected={(e) => {
            dispatch({
              type: "SET_CASE_FIELD",
              payload: e.target.value,
            });
            dispatch({
              type: "RESET_DISPLAY_CONDITIONS",
            });
          }}
        />
      )}
      {parentObjectField && (
        <FlexBox>
          <div
            className={classnames(
              classes.fakeLabel,
              classes.labelVariableLabelLength
            )}
          >
            {iln.gettext(
              `${parentFieldOptions[parent_object][parentObjectField].text} options`
            )}
          </div>
          <DisplayConditionList
            parent_object={parent_object}
            parentObjectFieldOptions={parentObjectFieldOptions}
            parentObjectField={parentObjectField}
            handleOptionSelected={(option, index) => {
              dispatch({
                type: "EDIT_DISPLAY_CONDITION",
                payload: {
                  parentObjectFieldOption: option,
                  parentObjectFieldOptionIndex: index,
                },
              });
            }}
            handleRemoveOption={(index) => {
              dispatch({
                type: "REMOVE_DISPLAY_CONDITION",
                payload: { index },
              });
            }}
            handleAddParentObjectFieldType={() =>
              dispatch({
                type: "ADD_TEMP_DISPLAY_CONDITION",
              })
            }
          />
        </FlexBox>
      )}
      {validConditionalBlockErrorMessage() && (
        <NotificationBox
          type={"info"}
          alertMessage={validConditionalBlockErrorMessage()}
        />
      )}
      <FlexBox
        className={classes.editConditionalBlockButtonContainer}
        hAlign={"space-between"}
      >
        <Button onClick={() => modalActions.removeById(modalId)}>
          {iln.gettext("Cancel")}
        </Button>
        <Button
          isDisabled={!!validConditionalBlockErrorMessage()}
          onClick={() => {
            modalActions.removeById(modalId);
            handleSaveConditionalBlock(conditionalOption);
          }}
        >
          {iln.gettext("Save")}
        </Button>
      </FlexBox>
    </div>
  );
};

EditConditionalBlock.propTypes = propTypes;

export default EditConditionalBlock;
