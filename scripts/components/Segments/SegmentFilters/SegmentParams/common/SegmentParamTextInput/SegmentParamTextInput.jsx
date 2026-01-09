import { FormTextInput } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./SegmentParamTextInput.propTypes";

const SegmentParamTextInput = ({
  onChange,
  customClassNames,
  value,
  initialValue,
}) => {
  return (
    <FormTextInput
      name={"segmentParamText"}
      onChange={(e) => onChange(e.target.value)}
      value={value || initialValue}
      customClassNames={customClassNames}
      keepErrorSpacing={false}
    />
  );
};

SegmentParamTextInput.propTypes = propTypes;

export default SegmentParamTextInput;
