import {
  categoryTypes,
  getCustomFieldBlocks,
} from "../../../../../helpers/localStorageHelper";

const type = (type, options) => {
  let returnType = type;
  switch (type) {
    case "int":
      if (Array.isArray(options)) {
        returnType = "Drop Down";
      } else {
        returnType = "Number";
      }
      break;
    case "varchar":
      returnType = "Text";
      break;
    case "text":
      returnType = "Text Area";
      break;
    case "checkbox":
      returnType = "Checkboxes";
      break;
    case "datetime":
      returnType = "Date";
      break;
  }
  return returnType;
};

const customFieldDisplayBlocks = () =>
  getCustomFieldBlocks().sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
const returnAllCategories = (filter) => filter.category === -1;
const returnAnyObjects = (filter) => filter.object === "any";
const returnIncludedCategories = (field, filter) =>
  field.categories.includes(filter.category);
const returnSelectedObjects = (field, filter) => field.object === filter.object;
const customDisplayBlockName = (field) => {
  return (
    customFieldDisplayBlocks().filter((block) => block.id === field.block_id)[0]
      ?.name || ""
  );
};

const categoriesAsList = (field) =>
  field.categories
    .map((category) => {
      const categoryTypesForField = categoryTypes.filter(
        (categoryType) => category === categoryType.id
      );
      if (categoryTypesForField && categoryTypesForField.length > 0) {
        return categoryTypesForField[0].categorytype;
      }
      return `Unknown category ID: ${category}`;
    })
    .join(", ");
const useFilterCustomFields = (filter, customFields) => {
  const filteredFields = customFields.reduce((acc, field) => {
    if (
      (returnAllCategories(filter) ||
        returnIncludedCategories(field, filter)) &&
      (returnAnyObjects(filter) || returnSelectedObjects(field, filter))
    ) {
      acc.push({
        id: field.id,
        name: field.name,
        object: field.object,
        customDisplayBlock: customDisplayBlockName(field),
        type: type(field.type, field.options),
        categories: categoriesAsList(field),
      });
    }
    return acc;
  }, []);

  return [filteredFields];
};

export default useFilterCustomFields;
