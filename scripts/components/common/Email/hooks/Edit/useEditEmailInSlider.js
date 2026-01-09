import React, { useContext } from "react";

import ComposeEmail from "../../../ComposeEmail/ComposeEmail.jsx";
import { ComposeEmailPlaceHolder } from "../../../ComposeEmail/ComposeEmailPlaceHolder.jsx";
import { SliderContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import useEditEmail from "./useEditEmail.js";

/**
 * Open slider with the email editor enclosed, populated with a reply email generated from given email.
 *
 * @param {number} caseId
 * @param {number} emailId
 * @param {EmailPropType} email - Email to generate reply email from, see types/Email: EmailPropType for data structure
 * @param {constituentPropType} constituent - Full constituent object, see Constituent PropType: types/constituent: constituentPropType
 * @param {function} handleEmailSaved - Event emitted when an email is saved in the email editor
 * @param {function} handleEmailSent - Event is emitted when an email is sent from the email editor
 * @param {function} handleEmailEditorUnmounted - Event is emitted when the email editor component is destroyed
 * @returns {[(function(): Promise<void>)|ErrorEvent]} - Exposed function, call to open slider with email editor.
 */
const useEditEmailInSlider = ({
  caseId,
  emailId,
  email,
  constituent,
  handleEmailSaved,
  handleEmailSent,
  handleEmailEditorUnmounted,
  onSliderClose,
  additionalMergeCodes,
}) => {
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const [editEmail] = useEditEmail({ emailId, email });

  const openSliderWithLoadingIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Write an Email"),
      component: <ComposeEmailPlaceHolder />,
    });
  };

  const openSliderWithEmailEditor = (email) => {
    sliderActions.open({
      title: iln.gettext("Send an email"),
      component: (
        <ComposeEmail
          unmounted={() => handleEmailEditorUnmounted()}
          constituent={constituent}
          emailSent={(sentEmail) => {
            handleEmailSent(sentEmail);
            sliderActions.close();
          }}
          caseId={caseId}
          email={email}
          emailSaved={(savedEmail) => handleEmailSaved(savedEmail)}
          additionalMergeCodes={additionalMergeCodes}
        />
      ),
      onClose: onSliderClose,
    });
  };
  const handleReply = async () => {
    openSliderWithLoadingIndicator();
    try {
      const email = await editEmail();
      openSliderWithEmailEditor(email);
    } catch (e) {
      sliderActions.close();
      return e;
    }
  };

  return [handleReply];
};

export default useEditEmailInSlider;
