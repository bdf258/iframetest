import React, { useState } from "react";
import { FormTextareaInput } from "@electedtech/electedtech-ui";
import propTypes from "./CustomFieldTextarea.propTypes";

let typingTimeout;
const CustomFieldTextarea = ({
  value,
  name,
  id,
  onChange,
  customClassNames = {},
  height,
}) => {
  const [text, setText] = useState(value);

  return (
    <FormTextareaInput
      minHeight={height}
      autosize
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

CustomFieldTextarea.propTypes = propTypes;
export default CustomFieldTextarea;
