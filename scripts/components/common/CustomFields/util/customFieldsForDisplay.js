export const customFieldsForDisplay = (
  customFieldValues,
  customFieldInputs
) => {
  return customFieldInputs.map((customField) => {
    const { id } = customField;
    const value = customFieldValues[id];
    return {
      id,
      value,
      input: customField,
    };
  });
};
