import { get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

const getSMSData = async (dateArray, modalActions) =>
  await get(`/SMSData`).catch((error) =>
    handleError(
      "There was an error while attempting to get a SMS data.",
      error,
      modalActions
    )
  );

const getDateRangeData = async (dateArray, modalActions) =>
  await post(`/SMSData`, dateArray).catch((error) =>
    handleError(
      "There was an error while attempting to get a SMS data.",
      error,
      modalActions
    )
  );

const sendSms = async ({ caseID, from, to, body }, modalActions) =>
  await post(`/sms/send`, { caseID, from, to, body }).catch((error) =>
    handleError(
      "There was an error while attempting to send an SMS.",
      error,
      modalActions
    )
  );

const updateSmsActioned = async ({ id, actioned }, modalActions) =>
  await patch(`/sms/${id}`, { actioned }).catch((error) =>
    handleError(
      "There was an error while attempting to update an SMS.",
      error,
      modalActions
    )
  );

const SMSAPI = {
  getSMSData,
  getDateRangeData,
  sendSms,
  updateSmsActioned,
};

export default SMSAPI;
