import { patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

const updateCustomField = async (id, payload, modalActions) =>
  await patch(`/customfields/${id}`, payload).catch((error) =>
    handleError("customFields", error, modalActions)
  );

const saveCustomField = async (payload, modalActions) =>
  await post(`/customfields`, payload).catch((error) =>
    handleError("customFields", error, modalActions)
  );

const bulkEditCustomFields = async (payload, modalActions) =>
  await post(`/customfields/bulkedit`, payload).catch((error) =>
    handleError("customFields", error, modalActions)
  );

const customFieldNameUnique = async (payload, modalActions, signal) =>
  await post("/customfields/test", payload, signal).catch((error) =>
    handleError("customFields", error, modalActions)
  );

const customFieldsAPI = {
  updateCustomField,
  saveCustomField,
  bulkEditCustomFields,
  customFieldNameUnique,
};

export default customFieldsAPI;
