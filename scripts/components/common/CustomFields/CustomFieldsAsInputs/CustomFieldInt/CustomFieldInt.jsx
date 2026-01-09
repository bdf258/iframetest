import CustomFieldDropdown from "../CustomFieldDropdown/CustomFieldDropdown.jsx";
import CustomFieldNumber from "../CustomFieldNumber/CustomFieldNumber.jsx";
import React from "react";
import propTypes from "./CustomFieldsInt.propTypes";

const CustomFieldInt = ({
  value,
  name,
  id,
  onChange,
  options,
  customClassNames = {},
}) => {
  if (options && options.length > 0) {
    return (
      <CustomFieldDropdown
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        options={options}
        customClassNames={customClassNames}
      />
    );
  }

  return (
    <CustomFieldNumber
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      customClassNames={customClassNames}
    />
  );
};

CustomFieldInt.propTypes = propTypes;

export default CustomFieldInt;
