import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

const getDoorknockingUsers = async (modalActions, iln) =>
  await get("/doorknocking/users").catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error retrieving the current active users")
        : "There was an error retrieving the current active users",
      error,
      modalActions
    );
  });

const saveDoorknockUser = async (payload, modalActions, iln) =>
  await post("/doorknocking/users", payload).catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error saving your entry. Please try again")
        : "There was an error saving your entry. Please try again",
      error,
      modalActions
    );
  });

const deleteDoorknockUser = async (id, modalActions, iln) =>
  await deleteReq(`/doorknocking/users/${id}`).catch((error) => {
    handleError(
      iln
        ? iln.gettext(
            "There was an error deleting your entry. Please try again"
          )
        : "There was an error deleting your entry. Please try again",
      error,
      modalActions
    );
  });

const bulkDeletedDoorknockUsers = async (payload, modalActions, iln) => {
  await post(`/doorknocking/bulkDelete`, payload).catch((error) => {
    handleError(
      iln
        ? iln.gettext("There was an error deleting users. Please try again")
        : "There was an error deleting your users. Please try again",
      error,
      modalActions
    );
  });
};

const getDoorknockOverview = async (payload, modalActions, iln) =>
  await post(`/doorknocking/stats`, payload).catch((error) => {
    handleError(
      iln
        ? iln.gettext(
            "There was an error retrieving the data. Please try again"
          )
        : "There was an error retrieving the data. Please try again",
      error,
      modalActions
    );
  });

const getDoorknockDetails = async (payload, modalActions, iln) =>
  await post(`/doorknocking/details`, payload).catch((error) => {
    handleError(
      iln
        ? iln.gettext(
            "There was an error retrieving the data. Please try again"
          )
        : "There was an error retrieving the data. Please try again",
      error,
      modalActions
    );
  });

const archiveDoorknockSurvey = async (id, modalActions, iln) =>
  await patch(`/doorknocking/${id}/archive`, {}).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to archive the survey."
          )
        : "There was an error while attempting to archive the survey.",
      error,
      modalActions
    )
  );

const unarchiveDoorknockSurvey = async (id, modalActions, iln) =>
  await patch(`/doorknocking/${id}/unarchive`, {}).catch((error) =>
    handleError(
      iln
        ? iln.gettext(
            "There was an error while attempting to restore the survey."
          )
        : "There was an error while attempting to archive the survey.",
      error,
      modalActions
    )
  );

export default {
  getDoorknockingUsers,
  saveDoorknockUser,
  deleteDoorknockUser,
  getDoorknockOverview,
  getDoorknockDetails,
  bulkDeletedDoorknockUsers,
  archiveDoorknockSurvey,
  unarchiveDoorknockSurvey,
};
