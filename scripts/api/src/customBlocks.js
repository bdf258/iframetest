import { deleteReq, get, patch, post } from "./util/fetch";
import { handleError } from "./util/handleError";

const createCustomBlock = async (payload, modalActions) =>
  await post(`/customblocks`, payload).catch((error) =>
    handleError("customblocks", error, modalActions)
  );

const updateCustomBlock = async (payload, modalActions) =>
  await patch(`/customblocks/${payload.id}`, payload).catch((error) =>
    handleError("customblocks", error, modalActions)
  );

const customBlocks = async (page = 1, itemLimit = 100, modalActions) =>
  await get(`/customblocks?page=${page}&amount=${itemLimit}`).catch((error) =>
    handleError("customblocks", error, modalActions)
  );

const deleteCustomBlock = async (
  { customBlockToDeleteId, customBlockToMapAssociatedCustomFieldToId = "" },
  modalActions
) => {
  const deleteCustomBlockWithoutCustomFields = `${customBlockToDeleteId}`;
  const deleteCustomBlockWithCustomFields = `${customBlockToDeleteId}/${customBlockToMapAssociatedCustomFieldToId}`;
  return await deleteReq(
    `/customblocks/${
      customBlockToMapAssociatedCustomFieldToId
        ? deleteCustomBlockWithCustomFields
        : deleteCustomBlockWithoutCustomFields
    }`
  ).catch((error) => handleError("customblocks", error, modalActions));
};

const customBlockNameUnique = async (payload, modalActions, signal) =>
  await post("/customblocks/test", payload, signal).catch((error) =>
    handleError("customblocks", error, modalActions)
  );

const customBlocksApi = {
  createCustomBlock: createCustomBlock,
  customBlocks: customBlocks,
  updateCustomBlock: updateCustomBlock,
  deleteCustomBlock: deleteCustomBlock,
  customBlockNameUnique: customBlockNameUnique,
};

export default customBlocksApi;
