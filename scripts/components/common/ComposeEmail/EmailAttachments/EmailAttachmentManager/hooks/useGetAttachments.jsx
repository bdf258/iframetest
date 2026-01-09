import { useContext, useEffect, useState } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";

const format = (caseFiles) => {
  const { emailAttachments, letters, files } = caseFiles;
  return {
    emailAttachments: emailAttachments,
    letters: letters.map((letter) => ({
      ...letter,
      createdAt: letter.timestamp,
    })),
    files: files.map((file) => ({
      ...file,
      fileName: file.originalFileName,
      createdAt: file.timestamp,
    })),
  };
};

const getCaseFiles = (caseFiles, currentAttachments) => {
  caseFiles = format(caseFiles);
  const caseEmailAttachments = disableCurrentAttachmentsInEmailAttachmentsList(
    caseFiles.emailAttachments,
    currentAttachments
  );
  return { ...caseFiles, emailAttachments: caseEmailAttachments };
};

const disableCurrentAttachmentsInEmailAttachmentsList = (
  caseEmailAttachments,
  currentAttachments
) => {
  return caseEmailAttachments.map((att) =>
    currentAttachments.find((currAtt) => currAtt.id === att.id)
      ? { ...att, attached: true }
      : att
  );
};

const useGetAttachments = (caseId, currentAttachments) => {
  const [caseAttachmentsLoading, setCaseAttachmentsLoading] = useState(true);
  const [caseFiles, setCaseFiles] = useState();

  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useEffect(() => {
    (async () => {
      try {
        const caseFiles = await api.getCaseAllCaseFiles(
          caseId,
          modalActions,
          iln
        );
        setCaseFiles(getCaseFiles(caseFiles, currentAttachments));
        setCaseAttachmentsLoading(false);
      } catch (e) {
        throw new Error("There was an error getting the case files.");
      }
    })();
    // eslint-disable-next-line
  }, [caseId]);

  return [caseAttachmentsLoading, caseFiles];
};

export default useGetAttachments;
