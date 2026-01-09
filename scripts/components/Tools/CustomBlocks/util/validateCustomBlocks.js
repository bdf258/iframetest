export const validateCustomBlocks = (customBlocks) => {
  if (!customBlocks) return [];
  if (customBlocks.length <= 0) return [];

  return customBlocks.filter((customBlock) => {
    if (
      !customBlock.hasOwnProperty("parent_object") ||
      !customBlock?.parent_object
    )
      return false;
    if (!customBlock.hasOwnProperty("type") || !customBlock?.type) return false;
    if (!customBlock.hasOwnProperty("name") || !customBlock?.name) return false;

    if (!customBlock.hasOwnProperty("display_conditions")) return false;
    return true;
  });
};
