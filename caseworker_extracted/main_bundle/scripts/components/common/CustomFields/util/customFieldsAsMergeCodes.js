import customFieldsForCategory from "../../../CasesPage/helpers/customFieldsForCategories";

/**
 * Returns a list of custom fields as merge codes
 * Filters custom fields by category
 * For use with bulk actions, CSV export etc... multiple categories
 * Does not return the value of the custom field
 */
const sortCustomFieldMergeCodesById = (mergeCodes) =>
  mergeCodes.sort((a, b) => a.id - b.id);

const customFieldsAsMergeCodes = (categories = []) => {
  const customFieldsFilteredByCategory = customFieldsForCategory(categories);

  const customFieldsAsMergeCodes = customFieldsFilteredByCategory.map(
    ({ id, name }) => ({
      id,
      description: name,
      mergeCode: `[[CustomField${id}]]`,
    })
  );

  return sortCustomFieldMergeCodesById(customFieldsAsMergeCodes);
};
export default customFieldsAsMergeCodes;
