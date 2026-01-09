import { FormTextInput } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./AddressTextInput.propTypes.js";
import useStyles from "../../ConstituentAddressForm.styles.js";

const AddressTextInput = ({ name, value, onChange, label }) => {
  const classes = useStyles();

  return (
    <FormTextInput
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      customClassNames={{ container: classes.inputContainer }}
      keepErrorSpacing={false}
    />
  );
};

AddressTextInput.propTypes = propTypes;

export default AddressTextInput;
