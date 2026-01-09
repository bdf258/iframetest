import React, { useContext, useEffect } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./propTypes";

const EmailTemplateAutoComplete = ({
  customClassNames,
  onResultClick,
  ...props
}) => {
  const { modalActions } = useContext(TranslationContext);
  const iln = useContext(TranslationContext);

  const [templates, setTemplates] = React.useState([]);

  useEffect(() => {
    api
      .searchEmailTemplates(
        {
          term: "",
          active: true,
          columnsToReturn: ["id", "name"],
        },
        modalActions,
        iln
      )
      .then((response) => setTemplates(response));
  }, []);

  return (
    <FormSelectAutoComplete
      keepErrorSpacing={false}
      name="emailTemplate"
      label={iln.gettext("Template")}
      labelKey="name"
      placeholder={iln.gettext("Type to search templates")}
      clearInputOnResultClick
      onChange={(e) => {
        onResultClick({
          id: e.target.value,
          name: e.target.name,
        });
      }}
      customClassNames={customClassNames}
      {...props}
    >
      {templates.map((template) => (
        <option key={template.id} value={template.id}>
          {template.name}
        </option>
      ))}
    </FormSelectAutoComplete>
  );
};

EmailTemplateAutoComplete.propTypes = propTypes;

export default EmailTemplateAutoComplete;
