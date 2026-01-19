import { handleError } from "./util/handleError";
import { post } from "./util/fetch";

const updateRestrictions = async (payload) =>
  await post("/restrictions", payload).catch((error) => handleError(error));

export default {
  updateRestrictions,
};
