import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./DisplayInBlockInput.propTypes";
import useFilteredDisplayInBlockOptions from "./hooks/useFilteredDisplayInBlockOptions";
import useSelectFirstOption from "./hooks/useSelectFirstOption";
import useStyles from "../CustomFieldEditor.styles";
const DisplayInBlockInput = ({
  selectedField,
  handleFormChange,
  additionalDisplayBlocks = [],
}) => {
  const classes = useStyles();
  const inputName = "block_id";
  const { object: selectedEntity } = selectedField;

  const displayInBlockOptions =
    useFilteredDisplayInBlockOptions(selectedEntity);

  useSelectFirstOption(
    selectedField.block_id,
    selectedEntity,
    handleFormChange,
    displayInBlockOptions,
    inputName
  );

  return (
    <FormSelectAutoComplete
      customClassNames={{
        label: classes.label,
        container: classes.inputContainer,
      }}
      label="Display in Block"
      name={inputName}
      value={selectedField.block_id}
      onChange={(e) => {
        handleFormChange(e);
      }}
      keepErrorSpacing={false}
    >
      {[...additionalDisplayBlocks, ...displayInBlockOptions].map(
        (block, index) => (
          <option key={index} value={block.id}>
            {block.name}
          </option>
        )
      )}
    </FormSelectAutoComplete>
  );
};

DisplayInBlockInput.propTypes = propTypes;

export default DisplayInBlockInput;
