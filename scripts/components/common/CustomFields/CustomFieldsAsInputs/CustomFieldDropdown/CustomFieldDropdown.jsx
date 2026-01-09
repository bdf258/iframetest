import {
  FormSelect,
  FormSelectAutoComplete,
} from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./CustomFieldDropdown.propTypes";

const CustomFieldDropdown = ({
  value,
  options,
  name,
  id,
  onChange,
  customClassNames,
}) => {
  const sortById = (list) => list.sort((a, b) => a.id - b.id);

  if (options.length >= 5) {
    return (
      <FormSelectAutoComplete
        name={name}
        label={name}
        value={value}
        onChange={(e) => onChange({ [id]: e.target.value })}
        keepErrorSpacing={false}
        customClassNames={customClassNames}
      >
        {sortById(options).map((option) => {
          const { text, id } = option;
          return (
            <option value={id} key={id}>
              {text}
            </option>
          );
        })}
      </FormSelectAutoComplete>
    );
  }

  return (
    <FormSelect
      name={name}
      label={name}
      value={value}
      onChange={(e) => onChange({ [id]: e.target.value })}
      keepErrorSpacing={false}
      customClassNames={customClassNames}
    >
      {sortById(options).map((option) => {
        const { text, id } = option;
        return (
          <option value={id} key={id}>
            {text}
          </option>
        );
      })}
    </FormSelect>
  );
};

CustomFieldDropdown.propTypes = propTypes;
export default CustomFieldDropdown;
