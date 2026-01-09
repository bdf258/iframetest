import { customFields as customFieldsLocalStorage } from "../../../../helpers/localStorageHelper";

/*
 * Removes custom fields that don't exist from a set of custom field values.
 */
export const removeCustomFieldsThatDoNotExist = (customFields) => {
  return Object.keys(customFields).reduce((acc, customFieldKey) => {
    const customFieldExists = !!customFieldsLocalStorage.find(
      (customField) => customField.id === parseInt(customFieldKey)
    );
    if (customFieldExists) {
      return {
        ...acc,
        ...{ [customFieldKey]: customFields[customFieldKey] },
      };
    }
    return acc;
  }, {});
};
