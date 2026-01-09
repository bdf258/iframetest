import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useContext } from "react";

/**
 * Generates a reply email from given email.
 * If the email is provided useEditEmail will not do HTTP to retrieve the email.
 *
 * @param {number} caseId
 * @param {number} emailId
 * @param {EmailPropType} email - Email to generate reply email from, see types/Email: EmailPropType for data structure
 * @returns {[function(): Promise<{EmailPropType}>]} - Returns the reply email, see EmailPropType for data structure
 */

const useEditEmail = ({ emailId, email }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const replyEmail = async () => {
    if (email) return email;

    const emailFromHttp = await api.getEmail(emailId, modalActions, iln);
    return emailFromHttp;
  };

  return [replyEmail];
};

export default useEditEmail;
