/**
 * Converts custom field merge codes into a merge code map for use in mergeCodes.js
 */
export const customFieldsAsMergeCodeMap = (customFieldMergeCodes) => {
  return customFieldMergeCodes.map(({ mergeCode, value }) => {
    return [mergeCode, value];
  });
};
