import React, { useState } from "react";
import SegmentParamInput from "../common/SegmentParamInput/SegmentParamInput.jsx";
import propTypes from "./SegmentParamsColumnInput.propTypes";

const SegmentParamsColumnInput = ({ value, onChange, selectedFilter }) => {
  const {
    value1Default,
    value1Show,
    value1Type,
    value2Default,
    value2Show,
    value2Type,
  } = selectedFilter;

  const [value1, setValue1] = useState(value.value1 || value1Default);
  const [value2, setValue2] = useState(value.value2 || value2Default);

  if (value1Show === "0") return null;

  return (
    <React.Fragment>
      {value1Show === "1" && (
        <SegmentParamInput
          onChange={(param) => {
            setValue1(param);
            onChange({ value1: param });
          }}
          value={value1}
          type={value1Type}
        />
      )}
      {value2Show === "1" && (
        <SegmentParamInput
          onChange={(param) => {
            setValue2(param);
            onChange({ value2: param });
          }}
          value={value2}
          type={value2Type}
        />
      )}
    </React.Fragment>
  );
};

SegmentParamsColumnInput.propTypes = propTypes;

export default SegmentParamsColumnInput;
