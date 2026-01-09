import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";

const languages = [
  {
    locale: "en_GB",
    text: "English",
  },
  {
    locale: "cy_GB",
    text: "Cymraeg",
  },
];

const LanguageSelect = ({ customClassNames, onChange }) => {
  const iln = useContext(TranslationContext);

  return (
    <FormSelect
      keepErrorSpacing={false}
      customClassNames={{
        label: customClassNames?.label || null,
        container: customClassNames?.container || null,
      }}
      label={iln.gettext("Language")}
      name="languageSelect"
      onChange={({ target: { value } }) => onChange(value)}
      value={iln.getLocale()}
    >
      {languages.map((language) => (
        <option key={language.locale} value={iln.gettext(language.locale)}>
          {language.text}
        </option>
      ))}
    </FormSelect>
  );
};

LanguageSelect.propTypes = propTypes;

export default LanguageSelect;
