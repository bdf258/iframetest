import AddParentObjectFieldType from "../../DisplayConditionList/ViewDisplayCondition/AddParentObjectFieldType/AddParentObjectFieldType.jsx";
import DisplayCondition from "./DisplayCondition/DisplayCondition.jsx";
import { FlexBox } from "@electedtech/electedtech-ui";
import React from "react";
import extraDisplayOptionsAvailable from "./util/extraOptionsAvailable";
import parentFieldOptions from "../../DisplayConditionList/util/parentFieldOptions";
import propTypes from "./DisplayConditionList.propTypes";

const DisplayConditionList = ({
  parent_object,
  parentObjectFieldOptions,
  parentObjectField,
  handleOptionSelected,
  handleRemoveOption,
  handleAddParentObjectFieldType,
}) => {
  return (
    <FlexBox column>
      {parentObjectFieldOptions.length > 0 &&
        parentObjectFieldOptions.map((parentObjectFieldOption, index) => (
          <DisplayCondition
            parent_object={parent_object}
            key={index}
            displayCondition={parentObjectFieldOption}
            caseFieldOption={parentObjectField}
            parentObjectFieldOptions={parentObjectFieldOptions}
            handleOptionSelected={(e) =>
              handleOptionSelected(e.target.value, index)
            }
            handleRemoveOption={() => handleRemoveOption(index)}
          />
        ))}
      {extraDisplayOptionsAvailable(
        parent_object,
        parentObjectField,
        parentObjectFieldOptions
      ) && (
        <AddParentObjectFieldType
          selectedParentFieldName={
            parentFieldOptions[parent_object][parentObjectField].text
          }
          handleAddParentObjectFieldType={() =>
            handleAddParentObjectFieldType()
          }
        />
      )}
    </FlexBox>
  );
};

DisplayConditionList.propTypes = propTypes;

export default DisplayConditionList;
