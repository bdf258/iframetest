import { installationPreferences } from "./localStorageHelper";

/*
 * case number: 12345
 * case prefix: ET
 * case ID: ET12345
 */

export default (caseNumber) =>
  `${installationPreferences.casePrefix || ""}${caseNumber
    .toString()
    .padStart(5, "0")}`;
