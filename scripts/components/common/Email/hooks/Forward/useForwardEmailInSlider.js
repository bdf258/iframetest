import React, { useContext } from "react";

import { ComposeEmailPlaceHolder } from "../../../ComposeEmail/ComposeEmailPlaceHolder.jsx";
import { SliderContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import WriteEmail from "../../../CreateCommunication/WriteEmail/WriteEmail.jsx";
import { useForwardEmail } from "./useForwardEmail";

/**
 * Generates forwarded email from given email.
 *
 * @param {number} caseId
 * @param {EmailPropType} emailToForward - Email to generate forwarded email from, see types/Email: EmailPropType for data structure
 * @param {constituentPropType} constituent - Full constituent object, see Constituent PropType: types/constituent: constituentPropType
 * @param {function} handleEmailSaved - Event emitted when an email is saved in the email editor
 * @param {function} handleEmailSent - Event is emitted when an email is sent from the email editor
 * @param {function} handleEmailEditorUnmounted - Event is emitted when the email editor component is destroyed
 * @returns {[(function(): Promise<void>)|ErrorEvent]} - Exposed function, call to open slider with email editor.
 */
export const useForwardEmailInSlider = ({
  caseId,
  customFieldValues = {},
  contactTypes = [],
  emailToForward,
  constituent,
  handleEmailSaved,
  handleEmailSent,
  handleEmailEditorUnmounted,
  caseDetails,
}) => {
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const [forwardedEmail] = useForwardEmail({ caseId, emailToForward });
  const openSliderWithLoadingIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Forward"),
      component: <ComposeEmailPlaceHolder />,
    });
  };

  const openSliderWithEmailEditor = (email) => {
    sliderActions.open({
      title: iln.gettext("Send an email"),
      component: (
        <WriteEmail
          editorUnmounted={() => handleEmailEditorUnmounted}
          constituent={constituent}
          emailSent={(email) => {
            handleEmailSent(email);
            sliderActions.close();
          }}
          caseId={caseId}
          existingEmail={email}
          emailSaved={(email) => handleEmailSaved(email)}
          forwardedEmail={false}
          caseDetails={caseDetails}
          customFieldValues={customFieldValues}
          contactTypes={contactTypes}
        />
      ),
    });
  };

  const handleForward = async () => {
    openSliderWithLoadingIndicator();

    try {
      const email = await forwardedEmail();
      openSliderWithEmailEditor(email);
    } catch (e) {
      sliderActions.close();
    }
  };

  return [handleForward];
};

export default useForwardEmailInSlider;
