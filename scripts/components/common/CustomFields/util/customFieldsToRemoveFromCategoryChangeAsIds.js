import { customFieldToBeRemovedByCategoryChange } from "./customFieldToBeRemovedByCategoryChange";

/*
 * Produces a list of custom fields that will be removed if the category is changed.
 * Returns a list of the ID's of the custom fields to remove.
 */
export const customFieldsToRemoveFromCategoryChangeAsIds = (
  newCategory,
  currentCategory,
  caseStatus
) => {
  const customFieldsToRemove = customFieldToBeRemovedByCategoryChange(
    newCategory,
    currentCategory,
    caseStatus
  );

  const customFieldsToRemoveAsIds = customFieldsToRemove.map(({ id }) => id);

  return customFieldsToRemoveAsIds;
};
