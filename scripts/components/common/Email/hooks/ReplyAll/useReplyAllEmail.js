import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { addReplySeparator } from "../../util/replySeparator";
import api from "@electedtech/api";
import { getValidSubjectCaseRef } from "../../util/validSubjectCaseRef";
import removeEmbededImages from "../../util/removeEmbededImages";
import { removeUserAndMpAddresses } from "../../util/removeUserAndMpEmailAddresses";
import { useContext } from "react";

/**
 * Generates a reply all email from given email.
 * If the email is provided useReplyAllEmail will not do HTTP to retrieve the email.
 *
 * @param {number} caseId
 * @param {number} emailId
 * @param {EmailPropType} email - Email to generate reply all email from, see types/Email: EmailPropType for data structure
 * @returns {[function(): Promise<{EmailPropType}>]} - Returns the reply all email, see EmailPropType for data structure
 */

export const useReplyAllEmail = ({ emailId, caseId, email }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const generateReplyAllEmail = (email) => {
    return {
      to: removeUserAndMpAddresses([
        email.from,
        ...(email.to ? email.to.filter((to) => to.email.includes("@")) : []),
      ]),
      cc: removeUserAndMpAddresses([
        ...(email.cc ? email.cc.filter((cc) => cc.email.includes("@")) : []),
      ]),
      bcc: removeUserAndMpAddresses([
        ...(email.bcc
          ? email.bcc.filter((bcc) => bcc.email.includes("@"))
          : []),
      ]),
      from: {},
      subject: getValidSubjectCaseRef(email.subject, caseId),
      purifiedBody: addReplySeparator(
        email,
        removeEmbededImages(email.purifiedBody)
      ),
      plainBody: addReplySeparator(email, removeEmbededImages(email.plainBody)),
      attachments: [],
    };
  };

  const replyAllEmail = async () => {
    if (email) {
      return generateReplyAllEmail(email);
    }

    const emailFromHttp = await api.getEmail(emailId, modalActions, iln);
    return generateReplyAllEmail(emailFromHttp);
  };

  return [replyAllEmail];
};
