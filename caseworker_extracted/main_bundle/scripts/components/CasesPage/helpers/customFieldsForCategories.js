import { customFields } from "../../../helpers/localStorageHelper";

const customFieldsForCategory = (categories) =>
  customFields.filter((customField) => {
    if (customField.object !== "cases") return false;
    if (categories.length === 0) return true;
    return categories.some((category) =>
      customField.categories.includes(category)
    );
  });

export default customFieldsForCategory;
