import React, { useContext } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";

const EmailSubject = ({ value, onChange, customClassNames }) => {
  const iln = useContext(TranslationContext);

  return (
    <FormTextInput
      customClassNames={customClassNames}
      label={iln.gettext("Subject")}
      name={"subject"}
      value={value}
      onChange={(e) => onChange(e)}
      keepErrorSpacing={false}
    />
  );
};

EmailSubject.propTypes = propTypes;

export default EmailSubject;
