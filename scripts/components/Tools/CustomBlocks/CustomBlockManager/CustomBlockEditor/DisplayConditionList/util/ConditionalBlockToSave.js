import parentFieldOptions from "./parentFieldOptions";

// Converts a custom block from the display format to save format for the BE.
export const conditionalBlockToSave = (
  conditionalBlockForDisplay,
  parent_object
) => {
  const { parentObjectField, parentObjectFieldOptions } =
    conditionalBlockForDisplay;

  const parentObjectFieldForStorage =
    parentFieldOptions[parent_object][parentObjectField]?.customBlock
      ?.storedAgainst;

  if (parentObjectFieldForStorage) {
    return {
      [parentObjectFieldForStorage]: parentObjectFieldOptions,
    };
  }
};
