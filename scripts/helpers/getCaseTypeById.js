import { getCaseTypes } from "./localStorageHelper";

const getCaseTypeById = (id) => {
  const caseTypes = getCaseTypes();
  return caseTypes.find((ct) => ct.id === id)?.casetype;
};
export default getCaseTypeById;
