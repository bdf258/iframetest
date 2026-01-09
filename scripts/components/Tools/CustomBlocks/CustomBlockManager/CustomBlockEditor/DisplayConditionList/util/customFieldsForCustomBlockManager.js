import { customFields } from "../../../../../../../helpers/localStorageHelper";

const customBlockTypesCompatibleWithCustomBlocks = ["int"];
const customFieldsCompatibleWithCustomBlocks = () =>
  customFields.filter(
    (customField) =>
      customBlockTypesCompatibleWithCustomBlocks.includes(customField.type) &&
      customField.options.length > 0
  );

const formatCustomFieldForCustomBlockManager = (customField) => {
  /*
   * The ID is presented as a string, this is mainly to be uniform with the existing display conditions for status types and category types.
   * Examples: {categoryTypeID: [1, 2, 3]} or {statusID: [1, 2, 3]}
   */
  const id = customField.id.toString();

  return {
    [id]: {
      value: id,
      text: customField.name,
      localStorage: {
        displayText: "text",
      },
      customBlock: {
        storedAgainst: id,
      },
      options: customField.options,
    },
  };
};
export const customFieldsForCustomBlockManager = () => {
  return customFieldsCompatibleWithCustomBlocks().reduce(
    (acc, customField) => {
      if (customField.object === "cases") {
        return {
          ...acc,
          cases: {
            ...acc.cases,
            ...formatCustomFieldForCustomBlockManager(customField),
          },
        };
      }
      if (customField.object === "constituents") {
        return {
          ...acc,
          constituents: {
            ...acc.constituents,
            ...formatCustomFieldForCustomBlockManager(customField),
          },
        };
      }

      return acc;
    },
    {
      cases: {},
      constituents: {},
    }
  );
};
