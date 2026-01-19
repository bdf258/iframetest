import { FormDatePicker } from "@electedtech/electedtech-ui";
import React from "react";
import { createUseStyles } from "react-jss";
import propTypes from "./SegmentParamDateInput.propTypes";

/**
 * The global styles defined in voterid.css are overriding and reducing the height of the year selector in the date picker.
 */
const useStyles = createUseStyles((customClassNames) => ({
  container: {
    ...customClassNames.container,
    "& select": {
      height: "30px !important",
    },
  },
}));

const SegmentParamDateInput = ({
  onChange,
  value,
  initialValue,
  label = "",
  customClassNames,
}) => {
  const classes = useStyles(customClassNames);

  return (
    <FormDatePicker
      customClassNames={{ container: classes.container }}
      maxDate={new Date()}
      minDate={new Date(2000, 0, 1)}
      dateFormat={"dd/MM/yyyy"}
      keepErrorSpacing={false}
      name={"segmentParamDate"}
      value={value || initialValue || new Date()}
      label={label}
      onChange={(e) => {
        const dateTime = e.target.value;

        if (!dateTime) return;
        const dateOnly = dateTime.split(" ")[0];

        if (!dateOnly) return;
        onChange(dateOnly);
      }}
    />
  );
};

SegmentParamDateInput.propTypes = propTypes;

export default SegmentParamDateInput;
