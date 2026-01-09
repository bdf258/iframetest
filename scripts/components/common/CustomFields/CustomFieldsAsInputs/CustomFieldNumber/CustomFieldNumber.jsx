import React, { useState } from "react";
import { FormTextInput } from "@electedtech/electedtech-ui";
import propTypes from "./CustomFieldNumber.propTypes";

let typingTimeout;

const CustomFieldNumber = ({
  value = "",
  name,
  id,
  onChange,
  customClassNames,
}) => {
  const [text, setText] = useState(value.toString());

  return (
    <FormTextInput
      name={name}
      label={name}
      value={text}
      onChange={(e) => {
        const userInputNumbersOnly = e.target.value.replace(
          /^[^0-9+]|[^0-9]/g,
          ""
        );
        clearTimeout(typingTimeout);
        setText(userInputNumbersOnly.toString());
        typingTimeout = setTimeout(
          () => onChange({ [id]: userInputNumbersOnly }),
          1000
        );
      }}
      keepErrorSpacing={false}
      customClassNames={customClassNames}
    />
  );
};

CustomFieldNumber.propTypes = propTypes;
export default CustomFieldNumber;
