/*
 * Associates a custom block with its custom fields
 * Returns a custom block, with its details
 * As well as all associated custom fields, their details and values
 */

import { customFieldsForDisplay } from "../../../common/CustomFields/util/customFieldsForDisplay";

export const associateCustomBlocksWithCustomFields = (
  customFields,
  customBlocks,
  customFieldValues
) => {
  return customBlocks.map((customBlock) => {
    const { id } = customBlock;

    const customFieldsForCustomBlock = customFields.filter(
      (customField) => customField.block_id === id
    );

    const customFieldsWithValues = customFieldsForDisplay(
      customFieldValues,
      customFieldsForCustomBlock
    );

    return {
      ...customBlock,
      inputs: customFieldsWithValues,
    };
  });
};
