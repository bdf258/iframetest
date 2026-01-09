import { FlexBox, FormSelect } from "@electedtech/electedtech-ui";
import IconButton from "../../../../../../../common/IconButton/IconButton.jsx";
import React from "react";
import parentFieldOptions from "../../../DisplayConditionList/util/parentFieldOptions";
import propTypes from "./DisplayCondition.propTypes";
import { useStyles } from "./DisplayCondition.style";

const DisplayCondition = ({
  displayCondition,
  caseFieldOption,
  parentObjectFieldOptions,
  handleOptionSelected,
  handleRemoveOption,
  parent_object,
}) => {
  const classes = useStyles();

  const displayConditionOptions = parentFieldOptions[parent_object][
    caseFieldOption
  ].options.filter((caseField) => {
    return (
      caseField.id === displayCondition ||
      !parentObjectFieldOptions.includes(caseField.id)
    );
  });

  return (
    <FlexBox>
      <FormSelect
        customClassNames={{
          label: classes.label,
          container: classes.inputContainer,
        }}
        value={displayCondition}
        name={"caseFieldType"}
        keepErrorSpacing={false}
        onChange={(e) => handleOptionSelected(e)}
      >
        {displayConditionOptions.map((caseFieldType) => (
          <option key={caseFieldType.id} value={caseFieldType.id}>
            {
              caseFieldType[
                parentFieldOptions[parent_object][caseFieldOption].localStorage
                  .displayText
              ]
            }
          </option>
        ))}
      </FormSelect>
      <div className={classes.crossIconContainer}>
        <IconButton
          onClick={() => handleRemoveOption()}
          icon={"cross"}
          colour={"lightgrey"}
          height={25}
          width={25}
        />
      </div>
    </FlexBox>
  );
};

DisplayCondition.propTypes = propTypes;

export default DisplayCondition;
