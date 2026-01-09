import {
  Button,
  FlexBox,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import AttachmentIcon from "../../../../common/icons/AttachmentIcon.jsx";
import { CaseAttachmentList } from "./CaseAttachmentList/CaseAttachmentList.jsx";
import { CurrentAttachmentList } from "./CurrentAttachmentList/CurrentAttachmentList.jsx";
import FileIcon from "../../../../common/icons/FileIcon.jsx";
import LetterIcon from "../../../../common/icons/LetterIcon.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./propTypes";
import useAttachmentManagerReducer from "./hooks/useAttachmentManagerReducer.jsx";
import useGetAttachments from "./hooks/useGetAttachments.jsx";
import useSaveEmail from "./hooks/useSaveEmail.jsx";
import { useStyles } from "./EmailAttachmentManager.styles.js";

const handleAddAttachment = async (
  emailId,
  modalActions,
  attachment,
  dispatch,
  fileType
) => {
  dispatch({
    type: "ATTACHMENT_UPLOADING",
  });
  try {
    const uploadedFile = await api.attachExistingFileToEmail(
      fileType,
      attachment.id,
      emailId,
      modalActions
    );
    dispatch({
      type: "ATTACH_FILE",
      attachment: { ...uploadedFile, originalFileId: attachment.id },
      fileType: `${fileType}s`,
    });
    dispatch({
      type: "ATTACHMENT_UPLOADED",
    });
  } catch (e) {
    dispatch({ type: "ATTACHMENT_UPLOADED" });
  }
};

const handleDeleteAttachment = async (attachment, dispatch) => {
  const { id } = attachment;

  dispatch({
    type: "DELETE_ATTACHMENT",
    attachment,
  });

  try {
    await api.deleteAttachment(id);
  } catch (e) {
    dispatch({
      type: "ATTACH_FILE",
      attachment,
      fileType: attachment.fileType,
    });
  }
};

const EmailAttachmentManager = ({
  emailId,
  caseId,
  attachments = [],
  updateAttachments,
  saveDraft,
  modalId,
}) => {
  const classes = useStyles();
  const { modalActions, modalState } = useContext(ModalContext);
  emailId = emailId ? emailId : modalState.props.emailId;
  const iln = useContext(TranslationContext);

  const [caseAttachmentsLoading, caseFiles] = useGetAttachments(
    caseId,
    attachments
  );

  const [savingEmail] = useSaveEmail(emailId, saveDraft);

  const [attachmentManagerState, dispatch] = useAttachmentManagerReducer(
    caseFiles,
    attachments
  );

  const {
    emailAttachments,
    files,
    letters,
    currentAttachments,
    uploadingAttachment,
  } = attachmentManagerState;

  useEffect(() => {
    updateAttachments(currentAttachments);
  }, [currentAttachments]);

  return (
    <React.Fragment>
      <br />
      {!savingEmail && !caseAttachmentsLoading ? (
        <div>
          <CurrentAttachmentList
            currentAttachments={currentAttachments}
            uploadingAttachment={uploadingAttachment}
            handleDeleteAttachment={({ attachment }) =>
              handleDeleteAttachment(attachment, dispatch)
            }
          />

          <CaseAttachmentList
            attachments={emailAttachments}
            type={"emailAttachment"}
            titleText={iln.gettext("Email Attachments")}
            noAttachmentsText={iln.gettext(
              "Case contains no email attachments"
            )}
            icon={<AttachmentIcon />}
            addAttachment={({ attachment, type }) =>
              handleAddAttachment(
                emailId,
                modalActions,
                attachment,
                dispatch,
                type
              )
            }
          />

          <CaseAttachmentList
            attachments={files}
            type={"file"}
            titleText={iln.gettext("Case Files")}
            noAttachmentsText={iln.gettext("Case contains no files")}
            icon={<FileIcon />}
            addAttachment={({ attachment, type }) =>
              handleAddAttachment(
                emailId,
                modalActions,
                attachment,
                dispatch,
                type
              )
            }
          />

          <CaseAttachmentList
            attachments={letters}
            type={"letter"}
            titleText={iln.gettext("Case Letters")}
            noAttachmentsText={iln.gettext("Case contains no letters")}
            icon={<LetterIcon />}
            addAttachment={({ attachment, type }) =>
              handleAddAttachment(
                emailId,
                modalActions,
                attachment,
                dispatch,
                type
              )
            }
          />
        </div>
      ) : (
        <FlexBox hAlign="center">
          <Spinner scale={2} />
        </FlexBox>
      )}
      <FlexBox hAlign="flex-end" className={classes.doneButton}>
        <Button onClick={() => modalActions.removeById(modalId)}>
          {iln.gettext("Done")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

EmailAttachmentManager.propTypes = propTypes;

export default EmailAttachmentManager;
