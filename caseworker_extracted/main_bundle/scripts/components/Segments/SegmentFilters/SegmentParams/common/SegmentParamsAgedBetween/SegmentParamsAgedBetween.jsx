import React, { useContext, useState } from "react";
import { FlexBox } from "@electedtech/electedtech-ui";
import SegmentParamAgeInput from "../SegmentParamAgeInput/SegmentParamAgeInput.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./SegmentParamsAgedBetween.propTypes";
import { useStyles } from "./SegmentParamsAgedBetween.styles";

/**
 * The data returned from the legacy segments page does not distinguish between dates and numbers, as both are represented as 'number' types.
 * To determine when to treat a value as a date, the name of the chosen segment is used as a reference.
 * This approach aligns with the decisions made in the legacy segments rivets UI.
 * The below inputs consume dates as strings "2000-01-01" and produce age as a number 25.
 * The user inputs an age as a number 25 this is then returned to the parent as a date string from today's date.
 * The following logic is specific to this item and should be removed or refactored when the segments module is rewritten.
 */
const SegmentParamsAgedBetween = ({ selectedFilter, value, onChange }) => {
  const { value1Default, value2Default } = selectedFilter;
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [value1, setValue1] = useState(value.value1 || value1Default);
  const [value2, setValue2] = useState(value.value2 || value2Default);

  return (
    <div className={classes.multiInputContainer}>
      <FlexBox hAlign={"right"}>
        <SegmentParamAgeInput
          className={classes.inputContainer}
          onChange={(age) => {
            setValue1(age);
            onChange({ value1: age });
          }}
          value={value1}
        />
        <span className={classes.inputSpacer}>{iln.gettext("and")}</span>
        <SegmentParamAgeInput
          className={classes.inputContainer}
          onChange={(age) => {
            setValue2(age);
            onChange({ value2: age });
          }}
          value={value2}
        />
      </FlexBox>
    </div>
  );
};

SegmentParamsAgedBetween.propTypes = propTypes;

export default SegmentParamsAgedBetween;
