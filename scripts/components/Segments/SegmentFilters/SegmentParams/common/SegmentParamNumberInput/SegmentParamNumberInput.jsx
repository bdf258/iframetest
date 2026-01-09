import React, { useState } from "react";
import { FormTextInput } from "@electedtech/electedtech-ui";
import propTypes from "./SegmentParamNumberInput.propTypes";
import { useStyles } from "./SegmentParamNumberInput.styles";

const SegmentParamNumberInput = ({
  onChange,
  value,
  initialValue,
  customClassNames,
}) => {
  const classes = useStyles();
  const [numberValue, setNumberValue] = useState(value || initialValue || "");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      setNumberValue("");
      return;
    }
    if (isNaN(inputValue)) return null;
    setNumberValue(inputValue);
    onChange(inputValue);
  };

  return (
    <FormTextInput
      name={"segmentParamNumber"}
      customClassNames={{
        ...customClassNames,
        container: classes.container,
      }}
      onChange={handleChange}
      value={numberValue}
      keepErrorSpacing={false}
    />
  );
};

SegmentParamNumberInput.propTypes = propTypes;
export default SegmentParamNumberInput;
