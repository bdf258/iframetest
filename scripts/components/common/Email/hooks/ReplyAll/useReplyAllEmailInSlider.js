import ComposeEmail from "../../../ComposeEmail/ComposeEmail.jsx";
import { ComposeEmailPlaceHolder } from "../../../ComposeEmail/ComposeEmailPlaceHolder.jsx";
import React from "react";
import { SliderContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { useContext } from "react";
import { useReplyAllEmail } from "./useReplyAllEmail";

/**
 * Open slider with the email editor enclosed, populated with a reply all email generated from given email.
 *
 * @param {number} caseId
 * @param {number} emailId
 * @param {EmailPropType} [email] - Email to generate reply email from, see types/Email: EmailPropType for data structure
 * @param {constituentPropType} constituent - Full constituent object, see Constituent PropType: types/constituent: constituentPropType
 * @param {function} handleEmailSaved - Event emitted when an email is saved in the email editor
 * @param {function} handleEmailSent - Event is emitted when an email is sent from the email editor
 * @param {function} handleEmailEditorUnmounted - Event is emitted when the email editor component is destroyed
 * @returns {[(function(): Promise<void>)|ErrorEvent]} - Exposed function, call to open slider with email editor.
 */

export const useReplyAllEmailInSlider = ({
  caseId,
  emailId,
  email,
  constituent,
  handleEmailSaved,
  handleEmailSent,
  handleEmailEditorUnmounted,
  additionalMergeCodes,
}) => {
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const [replyAllEmail] = useReplyAllEmail({ emailId, caseId, email });

  const openSliderWithLoadingIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Reply All"),
      component: <ComposeEmailPlaceHolder />,
    });
  };

  const openSliderWithEmailEditor = (email) => {
    sliderActions.open({
      title: iln.gettext("Send an email"),
      component: (
        <ComposeEmail
          unmounted={() => handleEmailEditorUnmounted}
          constituent={constituent}
          emailSent={(email) => {
            handleEmailSent(email);
            sliderActions.close();
          }}
          caseId={caseId}
          email={email}
          emailSaved={(email) => handleEmailSaved(email)}
          additionalMergeCodes={additionalMergeCodes}
        />
      ),
    });
  };

  const handleReplyAll = async () => {
    openSliderWithLoadingIndicator();
    try {
      const email = await replyAllEmail();
      openSliderWithEmailEditor(email);
    } catch (e) {
      sliderActions.close();
      return e;
    }
  };
  return [handleReplyAll];
};
