export const applyTypePrefix = (restrictions) =>
  restrictions.map((restriction) => ({
    ...restriction,
    id:
      restriction.type == "group" ? `g${restriction.id}` : `c${restriction.id}`,
  }));
