import { FormSelect } from "@electedtech/electedtech-ui";
import PropTypes from "prop-types";
import React from "react";
import { fromAddressesFromLocalStorage } from "./ComposeEmail/common/getFromAddress";

const EmailFromSelect = ({
  name,
  label,
  value = "",
  onChange,
  customClassNames,
  ...props
}) => {
  return (
    <FormSelect
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      customClassNames={customClassNames}
      {...props}
    >
      {fromAddressesFromLocalStorage().map((email, idx) => (
        <option value={email} key={idx}>
          {email}
        </option>
      ))}
    </FormSelect>
  );
};

EmailFromSelect.propTypes = {
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    select: PropTypes.string,
    autoComplete: PropTypes.shape({
      input: PropTypes.string,
      container: PropTypes.string,
      dropDown: PropTypes.string,
    }),
  }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default EmailFromSelect;
