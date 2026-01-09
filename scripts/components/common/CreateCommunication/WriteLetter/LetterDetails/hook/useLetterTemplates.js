import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import useDefaultLetterTemplateNames from "./useDefaultLetterTemplateNames";

/*
  Gets list of letter templates for chosen contact type (Constituent, Organisation, Minister).
  Removes default letter templates that are not relevant to chosen contact type.
  Adds default template to the top of the list for chosen contact type.
 */
const useLetterTemplates = (chosenContactTypeLetterTemplateName) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const [defaultLetterTemplateNames] = useDefaultLetterTemplateNames();
  const [letterTemplates, setLetterTemplates] = useState();

  useEffect(() => {
    if (!defaultLetterTemplateNames) return;
    api
      .searchLetterTemplates(
        { term: "", active: true, columnsToReturn: ["id", "name"] },
        modalActions,
        iln
      )
      .then((letterTemplates) => {
        const lowerCaseDefaultTemplateNames = defaultLetterTemplateNames.map(
          (templateName) => templateName.toLowerCase()
        );

        const letterTemplatesForContactType = letterTemplates.filter(
          ({ name }) => {
            const lowerCaseTemplateName = name.toLowerCase();

            return (
              !lowerCaseDefaultTemplateNames.includes(lowerCaseTemplateName) ||
              lowerCaseTemplateName ===
                chosenContactTypeLetterTemplateName.toLowerCase()
            );
          }
        );

        setLetterTemplates(letterTemplatesForContactType);
      })
      .catch(() => {
        setLetterTemplates([]);
      });
  }, [defaultLetterTemplateNames]);

  return [letterTemplates];
};

export default useLetterTemplates;
