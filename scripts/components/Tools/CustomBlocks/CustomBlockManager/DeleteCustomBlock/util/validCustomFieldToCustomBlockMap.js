export const validCustomFieldToCustomBlockMap = (customBlockToCustomFieldMap) =>
  customBlockToCustomFieldMap.every(
    (customFieldMap) => !!customFieldMap.mapToCustomBlockId
  );
