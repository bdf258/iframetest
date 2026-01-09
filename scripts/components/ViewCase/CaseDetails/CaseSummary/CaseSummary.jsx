import React, { useState } from "react";

import { FormTextareaInput } from "@electedtech/electedtech-ui";
import propTypes from "./propTypes";

let typingTimeout;

const CaseSummary = ({ initValue, onChange, ...props }) => {
  const [summary, setSummary] = useState(initValue);

  return (
    <FormTextareaInput
      value={summary}
      onChange={({ target: { name, value } }) => {
        clearTimeout(typingTimeout);
        setSummary(value);
        typingTimeout = setTimeout(
          () => onChange({ target: { name, value } }),
          1000
        );
      }}
      {...props}
    />
  );
};

CaseSummary.propTypes = propTypes;

export default CaseSummary;
