import React, { useContext } from "react";
import SegmentParamDateInput from "../SegmentParamDateInput/SegmentParamDateInput.jsx";
import SegmentParamDistanceInput from "../../SegmentParamDistanceInput/SegmentParamDistanceInput.jsx";
import SegmentParamNumberInput from "../SegmentParamNumberInput/SegmentParamNumberInput.jsx";
import SegmentParamTextInput from "../SegmentParamTextInput/SegmentParamTextInput.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./SegmentParamInput.propTypes";
const SegmentParamInput = ({
  onChange,
  value,
  initialValue,
  type,
  customClassNames,
}) => {
  const iln = useContext(TranslationContext);

  if (type === "datePickerSince") {
    return (
      <SegmentParamDateInput
        customClassNames={customClassNames}
        onChange={onChange}
        initialvalue={initialValue}
        value={value}
        label={iln.gettext("Added since")}
      />
    );
  }

  if (type === "datePicker") {
    return (
      <SegmentParamDateInput
        onChange={onChange}
        initialvalue={initialValue}
        value={value}
        customClassNames={customClassNames}
      />
    );
  }

  if (type === "number") {
    return (
      <SegmentParamNumberInput
        onChange={onChange}
        initialvalue={initialValue}
        value={value}
        customClassNames={customClassNames}
      />
    );
  }

  if (type === "text") {
    return (
      <SegmentParamTextInput
        onChange={onChange}
        initialvalue={initialValue}
        value={value}
        customClassNames={customClassNames}
      />
    );
  }

  if (type === "distance") {
    return (
      <SegmentParamDistanceInput
        onChange={onChange}
        initialvalue={initialValue}
        value={value}
        customClassNames={customClassNames}
      />
    );
  }

  return null;
};

SegmentParamInput.propTypes = propTypes;
export default SegmentParamInput;
