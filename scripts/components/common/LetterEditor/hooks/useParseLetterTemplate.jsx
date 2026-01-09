import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { customFieldsAsMergeCodeMap } from "../../MergeCodes/util/customFieldsAsMergeCodeMap";
import { installationPreferences } from "../../../../helpers/localStorageHelper";
import leftPadWithZeros from "../../../../helpers/leftPadWithZeros";
import { parseTemplate } from "../../MergeCodes/util/mergeCodes";

const getCaseRef = (caseId) =>
  leftPadWithZeros(caseId, 5, installationPreferences.casePrefix);

/**
 * Async hook
 * Parses a new letters content (Body and Footer) with the passed in letter template.
 * Fetches the letter template via HTTP.
 * Returns both the parsedLetter content: Body and Footer.
 * Return parsedLetter callback, can be called to parse a letter's content when required.
 *
 * @param letterTemplateId
 * @param recipientDetails
 * @param constituentDetails
 * @param caseId
 * @param dispatch
 * @param additionalMergeCodes
 * @returns {[parsedLetterContent: {parsedFooter: string, parsedBody: string}, parseLetter: function(letterContent: string, footerContent: string)]}
 */
const useParseLetterTemplate = ({
  letterTemplateId,
  recipientDetails,
  constituentDetails,
  caseId,
  dispatch,
  additionalMergeCodes = [],
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const [letterTemplate, setLetterTemplate] = useState();
  const [parsedLetterContent, setParsedLetterContent] = useState();

  const parseLetter = (letterContent, footerContent) => ({
    parsedBody: parseTemplate({
      template: letterContent,
      constituentDetails,
      recipientDetails,
      additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
      caseRef: getCaseRef(caseId),
      type: "letter",
      iln,
    }),
    parsedFooter: parseTemplate({
      template: footerContent,
      constituentDetails,
      recipientDetails,
      additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
      caseRef: getCaseRef(caseId),
      type: "letter",
      iln,
    }),
  });

  useEffect(() => {
    if (!letterTemplateId) {
      dispatch({
        type: "SET_TEMPLATE_PARSED",
        templateParsed: true,
      });
    }
    if (!letterTemplate && letterTemplateId) {
      (async () => {
        const letterTemplate = await api.getLetterTemplate(
          letterTemplateId,
          modalActions
        );
        dispatch({
          type: "SET_TEMPLATE_PARSED",
          templateParsed: true,
        });
        setLetterTemplate(letterTemplate);
      })();
    }
  }, []);

  useEffect(() => {
    if (!parsedLetterContent && letterTemplate) {
      if (constituentDetails && recipientDetails) {
        /**
         * If the template is blank don't run through parser, just set the content.
         * Must-have content for letter editor to bootstrap CKEditor.
         */
        if (letterTemplate.template === "") {
          setParsedLetterContent(" ");
          return;
        }

        const parsedTemplate = parseTemplate({
          template: letterTemplate.template,
          constituentDetails,
          recipientDetails,
          additionalMergeCodes:
            customFieldsAsMergeCodeMap(additionalMergeCodes),

          caseRef: getCaseRef(caseId),
          type: "letter",
          iln,
        });
        setParsedLetterContent(parsedTemplate);
      }
    }
  }, [letterTemplate]);

  return [parsedLetterContent, parseLetter];
};

export default useParseLetterTemplate;
