export const customFieldsForCaseCreation = (customFields) => {
  if (!customFields) return [];

  return customFields.filter((customField) => {
    return !!customField.hideonCreate;
  });
};
