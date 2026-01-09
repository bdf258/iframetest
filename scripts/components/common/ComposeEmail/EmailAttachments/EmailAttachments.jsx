import { Button, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import EmailAttachmentInput from "./EmailAttachmentInput.jsx";
import EmailAttachmentManager from "./EmailAttachmentManager/EmailAttachmentManager.jsx";
import { TranslationContext } from "context/translate";
import UploadAttachments from "./UploadAttachments/UploadAttachment.jsx";
import ViewOrDownloadFile from "../../../ViewCase/ViewOrDownloadFile/ViewOrDownloadFile.jsx";
import api from "@electedtech/api";
import propTypes from "./proptypes.js";
import { useStyles } from "./styles.js";

const deleteAttachment = async (
  attachment,
  attachments,
  setAttachments,
  onChange,
  modalActions,
  iln
) => {
  try {
    await api.deleteAttachment(attachment.id, modalActions, iln);
    const event = {
      target: {
        name: "attachments",
        value: {
          chips: attachments.filter((chip) => chip.id !== attachment.id),
          value: "",
        },
      },
    };
    setAttachments(event.target.value.chips);
    onChange(event);
  } catch (e) {
    onChange({
      target: {
        name: "attachments",
        value: {
          chips: attachments,
          value: "",
        },
      },
    });
  }
};

const attachmentUploaded = (
  attachment,
  attachments,
  setAttachments,
  onChange
) => {
  if (!attachment) return;

  const newAttachments = Array.isArray(attachment)
    ? [...attachments, ...attachment]
    : [...attachments, attachment];

  const event = {
    target: {
      name: "attachments",
      value: {
        chips: newAttachments,
        value: "",
      },
    },
  };

  setAttachments(event.target.value.chips);
  onChange(event);
};

const updateAttachments = (attachments, setAttachments, onChange) => {
  attachments = formatAttachmentsForInput(attachments);
  const event = {
    target: {
      name: "attachments",
      value: {
        chips: attachments,
        value: "",
      },
    },
  };
  setAttachments(attachments);
  onChange(event);
};

const formatAttachments = (attachments) =>
  attachments.map((attachment) => ({
    fileType: "emailAttachments",
    id: attachment.id,
    fileName: attachment.label,
  }));

const formatAttachmentsForInput = (attachments) =>
  attachments.map((attachment) => ({
    label: attachment.fileName,
    ...attachment,
  }));

const EmailAttachments = ({
  emailId,
  caseId,
  emailSaved,
  value,
  onChange,
  customClassNames,
  saveDraft,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [attachments, setAttachments] = useState(value.chips);

  const modalId = "attachmentManagerModal";

  const emailAttachmentManager = {
    component: (
      <EmailAttachmentManager
        modalId={modalId}
        emailId={emailId}
        caseId={caseId}
        attachments={formatAttachments(attachments)}
        saveDraft={saveDraft}
        updateAttachments={(attachments) =>
          updateAttachments(attachments, setAttachments, onChange)
        }
      />
    ),
    customClassNames: { card: classes.modalCard },
    title: iln.gettext("Attach to Email"),
    id: modalId,
  };
  const uploadAttachments = {
    component: (
      <UploadAttachments
        modalId={modalId}
        emailId={emailId}
        emailSaved={emailSaved}
        attachmentUploaded={(attachment) =>
          attachmentUploaded(attachment, attachments, setAttachments, onChange)
        }
        saveDraft={saveDraft}
      />
    ),
    title: iln.gettext("Upload Attachment"),
    id: modalId,
  };

  return (
    <React.Fragment>
      <EmailAttachmentInput
        onChipClick={(attachment) =>
          modalActions.add({
            id: "previewAttachmentModal",
            title: attachment.label,
            component: <ViewOrDownloadFile attachment={attachment} />,
            customClassNames: {
              card: classes.modalCard,
            },
          })
        }
        attachments={attachments}
        onChipRemoved={(attachment) =>
          deleteAttachment(
            attachment,
            attachments,
            setAttachments,
            onChange,
            modalActions,
            iln
          )
        }
        popoverContent={
          <React.Fragment>
            <Button
              customClassNames={classes.attachmentOptionsButton}
              type={"text"}
              onClick={() => modalActions.add(uploadAttachments)}
            >
              {iln.gettext("From my computer")}
            </Button>
            <Button
              customClassNames={classes.attachmentOptionsButton}
              type={"text"}
              onClick={() => modalActions.add(emailAttachmentManager)}
            >
              {iln.gettext("From Case")}
            </Button>
          </React.Fragment>
        }
        customClassNames={customClassNames}
      />
    </React.Fragment>
  );
};

EmailAttachments.propTypes = propTypes;

export default EmailAttachments;
