export const removeGroupFromName = (source) =>
  source.map((obj) => ({
    ...obj,
    name: obj.name.slice(obj.name.indexOf(": ") + 2),
  }));
