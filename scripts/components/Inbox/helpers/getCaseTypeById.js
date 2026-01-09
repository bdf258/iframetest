import { getCaseTypes } from "../../../helpers/localStorageHelper";

const caseTypes = getCaseTypes();

/**
 * @public Exposed interface: Adds left padding as zeros to a value.
 * @param {id} caseTypeId - Id of the caseType to get.
 * @returns {string} Case type.
 */
export const getCaseTypeByID = (caseTypeId) =>
  caseTypes.find((ct) => ct.id === caseTypeId)?.casetype || "Unknown Casetype";
