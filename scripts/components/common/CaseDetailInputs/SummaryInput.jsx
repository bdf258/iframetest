import { FormTextareaInput } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  removeMargin: {
    margin: 0,
  },
});

const SummaryInput = ({
  name,
  onChange,
  value,
  customClassNames = {},
  label,
  keepErrorSpacing,
}) => {
  const classes = useStyles();

  return (
    <FormTextareaInput
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      customClassNames={{
        input: customClassNames.input,
        label: customClassNames.label,
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
      keepErrorSpacing={keepErrorSpacing}
    />
  );
};

SummaryInput.propTypes = {
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    input: propTypes.string,
  }),
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
};

export default SummaryInput;
