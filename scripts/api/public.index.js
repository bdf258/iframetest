import authAPI from "./src/auth";
import flattenApis from "./src/util/flattenAPIs";

const api = flattenApis(authAPI);

export default api;
