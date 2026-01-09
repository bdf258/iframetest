export const removeTypePrefix = (restrictions) =>
  restrictions.map((r) => ({
    ...r,
    id: typeof r.id === "string" ? parseInt(r.id.slice(1)) : r.id,
  }));
