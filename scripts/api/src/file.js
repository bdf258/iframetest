import { deleteReq, file as fileUpload, get, patch } from "./util/fetch";

import { handleError } from "./util/handleError";

const getFile = async (fileID, modalActions, iln) =>
  await get(`/casefiles/${fileID}/content`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to get a file.")
        : "There was an error while trying to get a file.",
      error,
      modalActions
    )
  );

const getFileDetails = async (fileID, modalActions, iln) =>
  await get(`/casefiles/${fileID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while trying to get a file's details."
          )
        : "There was an error while trying to get a file's details.",
      error,
      modalActions
    )
  );

const uploadFile = async ({ file, ...data }, modalActions, iln) => {
  return await fileUpload("/casefiles", file, data).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to upload a file.")
        : "There was an error while trying to upload a file.",
      error,
      modalActions
    )
  );
};

const updateFile = async (fileID, payload, modalActions, iln) =>
  await patch(`/casefiles/${fileID}`, payload).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying update a file.")
        : "There was an error while trying update a file.",
      error,
      modalActions
    )
  );

const deleteFile = async (fileID, modalActions, iln) =>
  await deleteReq(`/casefiles/${fileID}`).catch((error) =>
    handleError(
      iln
        ? iln.gettext("There was an error while trying to delete a file.")
        : "There was an error while trying to delete a file.",
      error,
      modalActions
    )
  );

export default {
  getFile,
  getFileDetails,
  uploadFile,
  updateFile,
  deleteFile,
};
