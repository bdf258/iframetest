import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { addReplySeparator } from "../../util/replySeparator";
import api from "@electedtech/api";
import { getValidSubjectCaseRef } from "../../util/validSubjectCaseRef";
import removeEmbededImages from "../../util/removeEmbededImages";
import { useContext } from "react";

/**
 * Generates forwarded email from given email
 *
 * @param caseId
 * @param emailToForward - Email to forward, generates and email from this given email.
 * @returns {[function(): Promise<{EmailPropType}>]} - Returns the reply email, see EmailPropType for data structure */

export const useForwardEmail = ({ caseId, emailToForward }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const attachAttachmentsToForwardedEmail = async (emailId, attachments) => {
    const fileAttachmentPromises = [];

    attachments.forEach((attachment) => {
      fileAttachmentPromises.push(
        api.attachExistingFileToEmail(
          "emailAttachment",
          attachment.id,
          emailId,
          modalActions
        )
      );
    });

    await Promise.all(fileAttachmentPromises);
  };
  const getForwardedEmailBody = (email, body) => {
    return addReplySeparator(email, removeEmbededImages(body));
  };

  const saveDraft = async (emailToForward) =>
    api.saveDraftEmail(
      { ...emailToForward, caseID: caseId },
      modalActions,
      iln
    );

  const forwardedEmail = async () => {
    const { id } = await saveDraft({
      to: [],
      cc: [],
      bcc: [],
      from: {},
      subject: getValidSubjectCaseRef(emailToForward.subject, caseId),
      purifiedBody: getForwardedEmailBody(
        emailToForward,
        emailToForward.purifiedBody
      ),
      plainBody: getForwardedEmailBody(
        emailToForward,
        emailToForward.plainBody
      ),
    });
    if (emailToForward?.attachments) {
      await attachAttachmentsToForwardedEmail(id, emailToForward.attachments);
    }
    return await api.getEmail(id, modalActions, iln);
  };

  return [forwardedEmail];
};
