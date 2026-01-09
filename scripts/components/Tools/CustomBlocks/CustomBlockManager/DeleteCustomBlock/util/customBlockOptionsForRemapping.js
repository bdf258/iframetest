import { customFieldBlocks } from "../../../../../../helpers/localStorageHelper";

export const customBlockOptionsForRemapping = (customBlockId, parent_object) =>
  customFieldBlocks
    .filter((customBlock) => customBlock.type !== "core")
    .filter((customBlock) => customBlock.parent_object === parent_object)
    .filter((customBlock) => customBlock.id !== customBlockId);
