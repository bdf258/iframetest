import { deleteReq, get, patch, post } from "./util/fetch";

import { handleError } from "./util/handleError";

/**
 * get all caseworkers.
 * @returns {Promise} A promise that resolves to the response from the API.
 * @throws {String} An error message returned by the API.
 */
const getCategoryTypes = async (modalActions) =>
  await get("/categorytype").catch((error) =>
    handleError("getCategoryTypes", error, modalActions)
  );
const getCategoryType = async (id, modalActions) =>
  await get(`/categorytype/${id}`).catch((error) =>
    handleError("getCategoryType", error, modalActions)
  );
const createCategoryType = ({ categorytype, reviewInDays }, modalActions) =>
  post("/categorytype", { categorytype, reviewInDays }).catch((error) =>
    handleError("createCategoryType", error, modalActions)
  );
const updateCategoryType = ({ id, categorytype, reviewInDays }, modalActions) =>
  patch(`/categorytype/${id}`, { categorytype, reviewInDays }).catch((error) =>
    handleError("updateCategoryType", error, modalActions)
  );
const checkDeleteCategoryType = ({ id }, modalActions) =>
  post(`/categorytype/delete/${id}`).catch((error) =>
    handleError("deleteCheckCategoryType", error, modalActions)
  );
const deleteCategoryType = ({ id }, modalActions) =>
  deleteReq(`/categorytype/${id}`).catch((error) =>
    handleError("deleteCategoryType", error, modalActions)
  );
const deleteMergeCategoryType = ({ id, mergeID }, modalActions) =>
  deleteReq(`/categorytype/${id}/${mergeID}`).catch((error) =>
    handleError("deleteCategoryType", error, modalActions)
  );
const getCaseTypes = async (modalActions) =>
  await get("/casetype").catch((error) =>
    handleError("getCaseTypes", error, modalActions)
  );
const getCaseType = async (id, modalActions) =>
  await get(`/casetype/${id}`).catch((error) =>
    handleError("getCaseType", error, modalActions)
  );
const createCaseType = (
  { casetype, categorytypeID, retentionMonths },
  modalActions
) =>
  post("/casetype", { casetype, categorytypeID, retentionMonths }).catch(
    (error) => handleError("createCaseType", error, modalActions)
  );
const updateCaseType = (
  { id, casetype, categorytypeID, retentionMonths },
  modalActions
) =>
  patch(`/casetype/${id}`, {
    casetype,
    categorytypeID,
    retentionMonths,
  }).catch((error) => handleError("updateCaseType", error, modalActions));
const checkDeleteCaseType = ({ id }, modalActions) =>
  post(`/casetype/delete/${id}`).catch((error) =>
    handleError("checkDeleteCaseType", error, modalActions)
  );
const deleteCaseType = ({ id }, modalActions) =>
  deleteReq(`/casetype/${id}`).catch((error) =>
    handleError("deleteCaseType", error, modalActions)
  );
const deleteMergeCaseType = ({ id, mergeID }, modalActions) =>
  deleteReq(`/casetype/${id}/${mergeID}`).catch((error) =>
    handleError("deleteCaseType", error, modalActions)
  );
const getStatusTypes = async (modalActions) =>
  await get("/statustype").catch((error) =>
    handleError("getStatusTypes", error, modalActions)
  );
const getStatusType = async (id, modalActions) =>
  await get(`/statustype/${id}`).catch((error) =>
    handleError("getStatusType", error, modalActions)
  );
const createStatusType = (
  { statustype, categorytypeID, retentionMonths, closed },
  modalActions
) =>
  post("/statustype", {
    statustype,
    categorytypeID,
    retentionMonths,
    closed,
  }).catch((error) => handleError("createStatusType", error, modalActions));
const updateStatusType = (
  { id, statustype, categorytypeID, retentionMonths, closed },
  modalActions
) =>
  patch(`/statustype/${id}`, {
    statustype,
    categorytypeID,
    retentionMonths,
    closed,
  }).catch((error) => handleError("updateStatusType", error, modalActions));
const checkDeleteStatusType = ({ id }, modalActions) =>
  post(`/statustype/delete/${id}`).catch((error) =>
    handleError("checkDeleteStatusType", error, modalActions)
  );
const deleteStatusType = ({ id }, modalActions) =>
  deleteReq(`/statustype/${id}`).catch((error) =>
    handleError("deleteStatusType", error, modalActions)
  );
const deleteMergeStatusType = ({ id, mergeID }, modalActions) =>
  deleteReq(`/statustype/${id}/${mergeID}`).catch((error) =>
    handleError("deleteMergeStatusType", error, modalActions)
  );
const categorisationsAPI = {
  getCategoryTypes,
  getCategoryType,
  createCategoryType,
  updateCategoryType,
  checkDeleteCategoryType,
  deleteCategoryType,
  deleteMergeCategoryType,
  getCaseTypes,
  getCaseType,
  createCaseType,
  updateCaseType,
  checkDeleteCaseType,
  deleteCaseType,
  deleteMergeCaseType,
  getStatusTypes,
  getStatusType,
  createStatusType,
  updateStatusType,
  checkDeleteStatusType,
  deleteStatusType,
  deleteMergeStatusType,
};
export default categorisationsAPI;
