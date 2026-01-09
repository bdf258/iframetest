/*
 * Filters custom fields for a case
 * Takes into account category for each custom fields
 * Takes into account custom block display conditions
 */

import {
  customBlockAsCustomFields,
  customBlocksFilteredByDisplayConditions,
  customBlocksForCases,
} from "../../../Tools/CustomBlocks/util/filterCustomBlocks";
import {
  customFieldsForCasesOnly,
  customFieldsForCategory,
} from "./validCustomFieldsAsInputs";

export const customFieldsFilteredByCaseProperties = (
  customBlocks,
  caseCategory,
  caseStatus
) => {
  const customBlocksForNewCategory = customBlocksFilteredByDisplayConditions({
    customBlocks,
    caseCategory,
    caseStatus,
  });

  const customBlocksForCase = customBlocksForCases(customBlocksForNewCategory);

  const customFieldsFromCustomBlocks =
    customBlockAsCustomFields(customBlocksForCase);

  const customFieldsForCase = customFieldsForCasesOnly(
    customFieldsFromCustomBlocks
  );

  return customFieldsForCategory(customFieldsForCase, caseCategory);
};
