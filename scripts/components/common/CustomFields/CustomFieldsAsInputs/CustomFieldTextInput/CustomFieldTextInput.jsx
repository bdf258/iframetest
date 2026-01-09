import React, { useEffect, useState } from "react";
import { FormTextInput } from "@electedtech/electedtech-ui";
import propTypes from "./CustomFieldTextInput.propTypes";

let typingTimeout;
const CustomFieldTextInput = ({
  value,
  name,
  id,
  onChange,
  customClassNames = {},
}) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <FormTextInput
      name={name}
      label={name}
      onChange={(e) => {
        clearTimeout(typingTimeout);
        setText(e.target.value);
        typingTimeout = setTimeout(
          () => onChange({ [id]: e.target.value }),
          1000
        );
      }}
      value={text}
      keepErrorSpacing={false}
      customClassNames={customClassNames}
    />
  );
};

CustomFieldTextInput.propTypes = propTypes;
export default CustomFieldTextInput;
