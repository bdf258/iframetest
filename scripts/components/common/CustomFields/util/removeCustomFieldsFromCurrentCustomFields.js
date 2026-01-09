export const removeCustomFieldsFromCurrentCustomFields = (
  currentCustomFieldValue,
  customFieldsToBeRemoved
) => {
  return Object.entries(currentCustomFieldValue).reduce((acc, [key, value]) => {
    if (customFieldsToBeRemoved.includes(parseInt(key))) {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {});
};
