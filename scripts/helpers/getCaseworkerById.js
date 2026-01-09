import { getCaseworkers } from "./localStorageHelper";

const fallbackCaseworkers = getCaseworkers() || [];

const getCaseworkerById = (id, caseworkers) =>
  (caseworkers || fallbackCaseworkers)?.find(
    (caseworker) =>
      (caseworker?.ID || caseworker?.id).toString().trim() ===
      id.toString().trim()
  );

export default getCaseworkerById;
