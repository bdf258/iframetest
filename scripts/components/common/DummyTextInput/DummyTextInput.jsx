import { InputContainer, InputLabel } from "@electedtech/electedtech-ui";
import React, { useMemo } from "react";

import classnames from "classnames";
import { v4 as generateUUID } from "uuid";
import propTypes from "./DummyTextInput.propTypes.js";
import useStyles from "./DummyTextInput.styles.js";

const DummyTextInput = ({ name, label, value, customClassNames, ...props }) => {
  const classes = useStyles();
  const uuid = useMemo(() => generateUUID(), []);

  return (
    <InputContainer
      customClassNames={classnames(
        classes.container,
        customClassNames?.container
      )}
      {...props}
    >
      <InputLabel
        customClassNames={customClassNames?.label}
        name={name || uuid}
      >
        {label}
      </InputLabel>
      <div className={classes.value}>{value}</div>
    </InputContainer>
  );
};

DummyTextInput.propTypes = propTypes;

export default DummyTextInput;
