import {
  getCategoryTypes,
  getCustomFields,
} from "../../../../helpers/localStorageHelper";

const customFields = getCustomFields() || [];
const categoryTypes = getCategoryTypes() || [];

const getCasesPageCustomFields = (selectedCategorytypeID) =>
  customFields.filter((customField) => {
    if (!customField?.filterable) return false;
    if (customField.categories.length === categoryTypes.length) return true;
    if (
      customField.object === "cases" &&
      customField?.options?.length > 0 &&
      (customField.categories.includes(selectedCategorytypeID) ||
        customField.categories.includes(0))
    )
      return true;

    return false;
  });

export default getCasesPageCustomFields;
