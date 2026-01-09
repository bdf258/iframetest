import { get } from "./util/fetch";
import { handleError } from "./util/handleError";

const getSegment = async (id) =>
  await get(`/segments/${id}`).catch((error) => handleError(error));

export default {
  getSegment,
};
