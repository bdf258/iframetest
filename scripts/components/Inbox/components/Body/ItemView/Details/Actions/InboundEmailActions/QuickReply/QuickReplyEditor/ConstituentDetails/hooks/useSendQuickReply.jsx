import { ModalContext } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import prefixCaseID from "../../../../../../../../../../../../helpers/prefixCaseID.js";
import useCanSendEmail from "./useCanSendEmail.jsx";
import { useContext } from "react";

const useSendQuickReply = (state, dispatch, onEmailSend) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const canSendEmail = useCanSendEmail(state, dispatch);

  const {
    selectedConstituent,
    selectedCaseType,
    emailId: recievedEmailID,
    emailBody,
    replyFrom: from,
    replyTo,
    subject,
    tags,
  } = state;

  const handleSendQuickReply = async () => {
    let constituentId = selectedConstituent?.id;
    let caseId;
    let draftId;

    if (!canSendEmail) return;
    try {
      if (!constituentId) {
        try {
          const { id } = await api.createConstituent(
            { ...selectedConstituent, isOrganisation: false },
            modalActions,
            iln
          );
          constituentId = id;
        } catch (e) {
          return;
        }
      }
      try {
        const startsWithRE = subject
          .trim()
          .toLowerCase()
          .startsWith(iln.gettext("re:"));
        const summary = `${iln.gettext("Quick Reply sent")} ${
          startsWithRE ? subject : `${iln.gettext("Re:")} ${subject}`
        }`;

        const { id } = await api.createCase(
          {
            contactType: 1, // email
            caseType: selectedCaseType,
            constituentID: constituentId,
            status: 2, // closed
            category: 3, // campaign
            summary,
            tags: tags.map(({ id }) => id),
          },
          modalActions,
          iln
        );
        caseId = id;
      } catch (e) {
        await api.deleteConstituent(constituentId, modalActions, iln);
        return;
      }

      try {
        api.updateEmail(
          { emailID: recievedEmailID, caseID: caseId, actioned: true },
          modalActions,
          iln
        );
      } catch (e) {
        return;
      }

      try {
        const { id } = await api.saveDraftEmail(
          {
            caseID: caseId,
            from,
            to: [replyTo],
            cc: [],
            bcc: [],
            subject: `${subject} ${iln.gettext(
              "(Case Ref: %1)",
              `${prefixCaseID(caseId)}`
            )}`,
            htmlBody: emailBody,
          },
          modalActions,
          iln
        );
        draftId = id;
      } catch (e) {
        return;
      }

      await api.sendEmail(draftId, modalActions, iln);
      onEmailSend();
    } catch (e) {
      throw new Error(
        iln.gettext(
          "An error was encountered while attempting to send the quick reply."
        )
      );
    }
  };

  return [handleSendQuickReply];
};

export default useSendQuickReply;
