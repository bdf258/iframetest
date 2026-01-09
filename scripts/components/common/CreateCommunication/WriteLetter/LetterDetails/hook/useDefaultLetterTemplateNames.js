import { useEffect, useState } from "react";
import { constituentDefaultTemplateName } from "../../../helpers/createDirectContactTypeOption";
import { useReduxSlice } from "../../LetterContactTypeList/LetterContactTypes.redux";

/**
 * Returns the names of all the default letter templates.
 * Some are derived from the contactList endpoint.
 * Others are hard coded in the front-end: See createDirectContactTypeOption.jsx
 * @returns {[[String]]} default template names.- returns a list of default letter template names.
 */
const useDefaultLetterTemplateNames = () => {
  const { contactTypes } = useReduxSlice();

  const [defaultLetterTemplateNames, setDefaultLetterTemplateNames] =
    useState();

  useEffect(() => {
    const defaultLetterTemplateNamesFromContactTypes = [
      ...contactTypes,
      { default_template_name: constituentDefaultTemplateName },
    ].map(({ default_template_name }) => default_template_name);

    setDefaultLetterTemplateNames(defaultLetterTemplateNamesFromContactTypes);
  }, []);

  return [defaultLetterTemplateNames];
};

export default useDefaultLetterTemplateNames;
