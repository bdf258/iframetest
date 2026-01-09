import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { addReplySeparator } from "../../util/replySeparator";
import api from "@electedtech/api";
import { getValidSubjectCaseRef } from "../../util/validSubjectCaseRef";
import removeEmbededImages from "../../util/removeEmbededImages";
import { useContext } from "react";

/**
 * Generates a reply email from given email.
 * If the email is provided useReplyEmail will not do HTTP to retrieve the email.
 *
 * @param {number} caseId
 * @param {number} emailId
 * @param {EmailPropType} email - Email to generate reply email from, see types/Email: EmailPropType for data structure
 * @returns {[function(): Promise<{EmailPropType}>]} - Returns the reply email, see EmailPropType for data structure
 */

const useReplyEmail = ({ caseId, emailId, email }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const prependReplyPrefixToSubject = (subject) => {
    const subjectContainsPrependedReplyText = /^re: /i.test(subject);
    return subjectContainsPrependedReplyText ? subject : `Re: ${subject}`;
  };

  const getSubject = (email) => {
    const subjectWithCaseRef = getValidSubjectCaseRef(
      `${email.subject}`,
      caseId
    );

    return prependReplyPrefixToSubject(subjectWithCaseRef);
  };

  const generateReplyEmail = (email) => {
    return {
      caseID: caseId,
      to: [email.from],
      cc: [],
      bcc: [],
      from: {},
      purifiedBody: addReplySeparator(
        email,
        removeEmbededImages(email.purifiedBody)
      ),
      plainBody: addReplySeparator(email, removeEmbededImages(email.plainBody)),
      attachments: [],
      subject: getSubject(email),
    };
  };
  const replyEmail = async () => {
    if (email) return generateReplyEmail(email);

    const emailFromHttp = await api.getEmail(emailId, modalActions, iln);
    return generateReplyEmail(emailFromHttp);
  };

  return [replyEmail];
};

export default useReplyEmail;
