import { FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { TranslationContext } from "context/translate";
import propTypes from "./SegmentParamDistanceInput.propTypes";
import { useStyles } from "./SegmentParamDistanceInput.styles";

const SegmentParamDistanceInput = ({
  onChange,
  value,
  initialValue,
  customClassNames,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const [distance, setDistance] = useState(value || initialValue || "");

  const handleOnChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setDistance(inputValue);
      onChange(inputValue);
      return;
    }

    const newDistance = parseFloat(inputValue);
    const wholeNumberRegex = /^-?\d*$/;

    if (isNaN(newDistance) && wholeNumberRegex.test(inputValue)) return null;
    if (newDistance < 0) return;
    if (newDistance > 110) return;

    setDistance(newDistance);
    onChange(newDistance);
  };

  return (
    <FlexBox>
      <span className={classes.inputSpacer}>{iln.gettext("Distance")}</span>
      <FormTextInput
        name="segmentParamDistance"
        onChange={handleOnChange}
        value={distance}
        customClassNames={{
          ...customClassNames,
          container: classes.inputContainer,
        }}
        type="number"
        min={0}
        max={110}
        keepErrorSpacing={false}
      />
      <span className={classes.inputSpacer}>{iln.gettext("km")}</span>
    </FlexBox>
  );
};

SegmentParamDistanceInput.propTypes = propTypes;

export default SegmentParamDistanceInput;
