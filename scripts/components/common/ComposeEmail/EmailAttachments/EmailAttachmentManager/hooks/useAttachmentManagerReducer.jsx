import { useEffect, useReducer } from "react";

const attachmentManagerInitialState = {
  emailAttachments: [],
  letters: [],
  files: [],
  currentAttachments: [],
  uploadingAttachment: false,
};

const attachmentManagerReducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE_ATTACHMENTS": {
      const {
        files,
        letters,
        emailAttachments,
        currentAttachments,
        loadingFiles,
      } = action;
      return {
        ...state,
        files,
        letters,
        emailAttachments,
        currentAttachments,
        loadingFiles,
      };
    }

    case "ATTACH_FILE": {
      const { fileType, attachment } = action;
      const { currentAttachments } = state;
      const { originalFileId } = attachment;
      return {
        ...state,
        currentAttachments: [
          ...currentAttachments,
          { ...attachment, fileType },
        ],
        [fileType]: state[fileType].map((file) =>
          file.id === originalFileId ? { ...file, attached: true } : file
        ),
      };
    }

    case "DELETE_ATTACHMENT": {
      const { currentAttachments } = state;
      const { attachment } = action;
      const { id, originalFileId, fileType } = attachment;

      return {
        ...state,
        currentAttachments: currentAttachments.filter((att) => att.id !== id),
        [fileType]: state[fileType].map((file) =>
          file.id === originalFileId ? { ...file, attached: false } : file
        ),
      };
    }

    case "ATTACHMENT_UPLOADING": {
      return { ...state, uploadingAttachment: true };
    }

    case "ATTACHMENT_UPLOADED": {
      return { ...state, uploadingAttachment: false };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useAttachmentManagerReducer = (caseFiles, currentAttachments) => {
  useEffect(() => {
    if (caseFiles) {
      dispatch({
        type: "INITIALISE_ATTACHMENTS",
        files: caseFiles.files,
        letters: caseFiles.letters,
        emailAttachments: caseFiles.emailAttachments,
        currentAttachments: currentAttachments.map((ca) => ({
          ...ca,
          originalFileId: ca.id,
        })),
      });
    }
  }, [caseFiles]);

  const [attachmentManagerState, dispatch] = useReducer(
    attachmentManagerReducer,
    attachmentManagerInitialState
  );

  return [attachmentManagerState, dispatch];
};

export default useAttachmentManagerReducer;
