import { FlexBox, FormSelectAutoComplete } from "@electedtech/electedtech-ui";

import React from "react";
import { customFields } from "../../../../../../helpers/localStorageHelper";
import propTypes from "./DisplayIfInput.propTypes";
import useStyles from "../../CustomFieldEditor.styles";

const DisplayIfInput = ({
  option,
  optionIndex,
  selectedField,
  handleUpdateField,
}) => {
  const classes = useStyles();

  const customFieldsForFilter = [
    {
      id: 0,
      name: "None",
      categories: [],
    },
    ...customFields,
  ];

  const label = () =>
    `Display if ${
      customFieldsForFilter.filter(
        (element) => element.id === selectedField.filteredBy
      )[0].name
    } is `;

  const customFieldsForChosenFilter = () =>
    customFieldsForFilter.filter(
      (field) => field.id === selectedField.filteredBy
    )[0];

  const handleOptionCategoryFilterSelected = (e, optionIndex) => {
    selectedField.options[optionIndex].filterID = e.target.value;
    handleUpdateField({
      ...selectedField,
    });
  };

  return (
    <FlexBox>
      <FormSelectAutoComplete
        keepErrorSpacing={false}
        name={`optionFilterID-${option.id}`}
        value={option.filterID}
        customClassNames={{
          label: classes.filterOptionsLabel,
          select: classes.filterOptionsLabel,
          autoComplete: {
            input: classes.filterOptionsLabel,
            dropDown: classes.filterOptionsLabel,
          },
        }}
        label={label()}
        onChange={(e) => {
          handleOptionCategoryFilterSelected(e, optionIndex);
        }}
      >
        {customFieldsForChosenFilter()
          .options.sort((a, b) =>
            a.text > b.text ? 1 : b.text > a.text ? -1 : 0
          )
          .map((optionElement) => {
            return (
              <option key={optionElement.id} value={optionElement.id}>
                {optionElement.text}
              </option>
            );
          })}
      </FormSelectAutoComplete>
    </FlexBox>
  );
};

DisplayIfInput.propTypes = propTypes;

export default DisplayIfInput;
