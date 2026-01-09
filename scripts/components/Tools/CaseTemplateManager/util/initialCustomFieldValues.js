import {
  customFieldBlocks,
  customFields,
} from "../../../../helpers/localStorageHelper";
import {
  customFieldsForCasesOnly,
  customFieldsForCategory,
  customFieldsForDetailsBlock,
  validateCustomFields,
} from "../../../common/CustomFields/util/validCustomFieldsAsInputs";
import { customBlocksFilteredByDisplayConditions } from "../../CustomBlocks/util/filterCustomBlocks";
import { customFieldsDefaultValues } from "../../../common/CustomFields/util/customFieldsDefaultValues";
import { customFieldsForCaseCreation } from "../../../common/CustomFields/util/customFieldsForCaseCreation";
import { removeCustomFieldsThatDoNotExist } from "../../../common/CustomFields/util/removeCustomFieldsThatDoNotExist";

const getCustomFields = (customFields, caseCategory) => {
  const validCustomFields = validateCustomFields(customFields);

  const customFieldsForCaseOnly = customFieldsForCasesOnly(validCustomFields);

  const customFieldsForCategoryOnly = customFieldsForCategory(
    customFieldsForCaseOnly,
    caseCategory
  );

  const customFieldsForCaseCreationOnly = customFieldsForCaseCreation(
    customFieldsForCategoryOnly
  );

  return customFieldsForCaseCreationOnly;
};

/*
 * Returns custom field values for case creation
 * Values are returned as a default value if the field has no value set
 * Custom field values are only returned for custom fields filtered by category
 * Custom field values are only returned for custom blocks filtered by category and status
 * Removes values of fields that do not exist.
 */
export const initialCustomFieldValues = (
  customFieldValues = {},
  caseCategory,
  caseStatus
) => {
  if (!caseCategory) return [];

  const customFieldsForCase = getCustomFields(customFields, caseCategory);

  const customFieldsForDetails =
    customFieldsForDetailsBlock(customFieldsForCase);

  const customBlocksForCase = customBlocksFilteredByDisplayConditions({
    customBlocks: customFieldBlocks,
    caseCategory,
    caseStatus,
    customFieldValues,
  });

  const customBlockIds = customBlocksForCase.map(({ id }) => id);

  const customFieldsForCaseCreation = customFieldsForCase.filter(
    (customField) => {
      return customBlockIds.includes(customField.block_id);
    }
  );

  const customFieldDefaultValues = customFieldsDefaultValues([
    ...customFieldsForCaseCreation,
    ...customFieldsForDetails,
  ]);

  return {
    ...customFieldDefaultValues,
    ...removeCustomFieldsThatDoNotExist(customFieldValues),
  };
};
