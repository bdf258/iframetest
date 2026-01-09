export const customFieldsDefaultValues = (customFieldsToBeReset) => {
  if (!customFieldsToBeReset) return [];

  return customFieldsToBeReset.reduce((acc, customFieldToRemove) => {
    const { id, type, options } = customFieldToRemove;
    switch (type) {
      case "int": {
        if (options && options.length > 0) {
          return { ...acc, [id]: options[0].id };
        } else {
          return { ...acc, [id]: 0 };
        }
      }
      case "varchar":
      case "text": {
        return { ...acc, [id]: "" };
      }
      case "datetime": {
        return { ...acc, [id]: null };
      }
    }
  }, {});
};
