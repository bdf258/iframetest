export const customFieldsSortedByOrderNo = (customFields) =>
  customFields.sort((a, b) => a.orderNo - b.orderNo);
