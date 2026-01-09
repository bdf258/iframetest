import {
  customBlockAsCustomFieldsWithCustomBlockDisplayCondition,
  customFieldsToBeRemovedWithDisplayConditions,
} from "../../../Tools/CustomBlocks/util/filterCustomBlocks";
import {
  customFieldsForCasesOnly,
  customFieldsForCategory,
} from "./validCustomFieldsAsInputs";
import { customFieldBlocks } from "../../../../helpers/localStorageHelper";

const customFieldsNotInCategory = (customFields, category) =>
  customFields.filter(
    (customField) => !customField.categories.includes(category)
  );

export const customFieldToBeRemovedByCategoryChange = (
  newCategory,
  currentCategory,
  caseStatus
) => {
  const customBlocksAsCustomFields =
    customBlockAsCustomFieldsWithCustomBlockDisplayCondition(customFieldBlocks);

  const customFieldsFilteredForDisplayConditions =
    customFieldsToBeRemovedWithDisplayConditions(
      customBlocksAsCustomFields,
      newCategory,
      caseStatus
    );

  const currentCustomFieldsForCategory = customFieldsForCategory(
    customFieldsFilteredForDisplayConditions,
    currentCategory
  );

  const customFieldsForCases = customFieldsForCasesOnly(
    currentCustomFieldsForCategory
  );

  const customFieldsToRemove = customFieldsNotInCategory(
    customFieldsForCases,
    newCategory
  );

  return customFieldsToRemove;
};
