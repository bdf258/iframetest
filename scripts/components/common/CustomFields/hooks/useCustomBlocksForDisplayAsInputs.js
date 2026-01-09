import {
  customBlocksExcludeDetailsBlock,
  customBlocksFilteredByDisplayConditions,
  customBlocksForCases,
  customBlocksWithInputs,
} from "../../../Tools/CustomBlocks/util/filterCustomBlocks";
import {
  customFieldsForCasesOnly,
  customFieldsForCategory,
  validateCustomFields,
} from "../util/validCustomFieldsAsInputs";
import { associateCustomBlocksWithCustomFields } from "../../../Tools/CustomBlocks/util/associateCustomBlocksWithCustomFields";
import { customBlockWithInputsOrdered } from "../../../Tools/CustomBlocks/util/customBlockWithInputsOrdered";
import { validateCustomBlocks } from "../../../Tools/CustomBlocks/util/validateCustomBlocks";

/**
 * Custom Blocks for Display as Inputs
 * @param customFields - {Array<Number>}
 * @param customBlocks - {Array<Number>}
 * @param customFieldValues - {Object<id, value>}
 * @param caseCategory - {Number}
 * @param caseStatus - {Number}
 */
export const useCustomBlocksForDisplayAsInputs = (
  customFields = [],
  customBlocks = [],
  customFieldValues = [],
  caseCategory,
  caseStatus
) => {
  const validCustomFields = validateCustomFields(customFields);
  const customFieldsForCases = customFieldsForCasesOnly(validCustomFields);
  const customFieldsForCategoryOnly = customFieldsForCategory(
    customFieldsForCases,
    caseCategory
  );
  const validCustomBlocks = validateCustomBlocks(customBlocks);
  const casesCustomBlocks = customBlocksForCases(validCustomBlocks);
  const customBlockWithOutDetailsBlock =
    customBlocksExcludeDetailsBlock(casesCustomBlocks);
  const customBlocksFiltered = customBlocksFilteredByDisplayConditions({
    customBlocks: customBlockWithOutDetailsBlock,
    caseCategory,
    caseStatus,
    customFieldValues,
  });

  const customBlocksWithAssociatedCustomFields =
    associateCustomBlocksWithCustomFields(
      customFieldsForCategoryOnly,
      customBlocksFiltered,
      customFieldValues
    );

  const customBlocksWithOptionsOrdered = customBlockWithInputsOrdered(
    customBlocksWithAssociatedCustomFields
  );

  const customBlocksThatHaveInputs = customBlocksWithInputs(
    customBlocksWithOptionsOrdered
  );

  return [customBlocksThatHaveInputs];
};
