export const validateCustomFieldProperties = (customFields) => {
  return customFields.filter((customField) => {
    if (!customField.hasOwnProperty("object") || !customField?.object)
      return false;
    if (!customField.hasOwnProperty("name") || !customField?.name) return false;
    if (!customField.hasOwnProperty("type") || !customField?.type) return false;
    if (!customField.hasOwnProperty("block") || !customField?.block)
      return false;
    if (!customField.hasOwnProperty("categories")) return false;
    return true;
  });
};

/*
 * Removes custom fields that have invalid values.
 * Custom fields of type "int" and "Checkbox", should have a list of options.
 * If there are no options the custom field is excluded.
 */
export const validateCustomFieldTypeAgainstValue = (customFields) => {
  return customFields.filter((customField) => {
    if (!customField?.type) return false;

    return true;
  });
};

export const customFieldsForCasesOnly = (customFields) => {
  return customFields.filter((customField) => customField.object === "cases");
};

/*
 * Custom field for the View case page details block
 * Should only be custom fields that are associated with the details block
 * Inputs should only be of type, int, text and varchar
 */
export const customFieldsForDetailsBlock = (customFields) => {
  const customFieldsForDetailsBlock = customFields.filter(
    (customField) =>
      customField.block === "details" || customField.block === "Details"
  );
  return customFieldsForDetailsBlock.filter((customField) => {
    const { type } = customField;
    return (
      type === "int" ||
      type === "text" ||
      type === "varchar" ||
      type === "datetime"
    );
  });
};

export const validateCustomFields = (customFields) => {
  const customFieldsWithRequiredProperties =
    validateCustomFieldProperties(customFields);

  const validCustomFields = validateCustomFieldTypeAgainstValue(
    customFieldsWithRequiredProperties
  );

  return validCustomFields;
};

/**
 * If no category is supplied all fields are returned.
 */
export const customFieldsForCategory = (customFields, caseCategory) => {
  if (!caseCategory) return customFields;

  return customFields.filter((customField) => {
    const { categories } = customField;

    if (!categories || categories.length < 0) return false;

    if (categories.includes(caseCategory)) {
      return true;
    }
  });
};
