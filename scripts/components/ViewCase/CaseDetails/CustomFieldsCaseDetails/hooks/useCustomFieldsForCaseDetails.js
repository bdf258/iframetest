import {
  customFieldsForCasesOnly,
  customFieldsForCategory,
  customFieldsForDetailsBlock,
  validateCustomFields,
} from "../../../../common/CustomFields/util/validCustomFieldsAsInputs";
import { customFieldsForDisplay } from "../../../../common/CustomFields/util/customFieldsForDisplay";
import { customFieldsSortedByOrderNo } from "../../../../common/CustomFields/util/customFieldsSortedByOrderNo";

/*
 * Removes invalid custom fields that are supplied from local storage.
 * Returns only custom fields that would be displayed in the case details section.
 */
export const validCustomFieldsForViewCaseDetailsBlock = (customFields) => {
  if (!customFields || customFields.length <= 0) return [];

  const validCustomFields = validateCustomFields(customFields);

  const customFieldsForCases = customFieldsForCasesOnly(validCustomFields);

  const customFieldsForDisplayInDetailsBlock =
    customFieldsForDetailsBlock(customFieldsForCases);

  const sortedCustomFields = customFieldsSortedByOrderNo(
    customFieldsForDisplayInDetailsBlock
  );

  return sortedCustomFields;
};

export const useCustomFieldsForCaseDetails = (
  customFields,
  customFieldValues,
  caseCategory
) => {
  const customFieldInputs =
    validCustomFieldsForViewCaseDetailsBlock(customFields);

  const customFieldsAsInputsForCategory = customFieldsForCategory(
    customFieldInputs,
    caseCategory
  );

  const customFieldsDisplay = customFieldsForDisplay(
    customFieldValues,
    customFieldsAsInputsForCategory
  );

  return [customFieldsDisplay];
};
