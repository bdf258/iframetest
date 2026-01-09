export const prependGroupToName = (source) =>
  source.map((obj) => ({
    ...obj,
    name: obj.group ? obj.group + ": " + obj.name : obj.name,
  }));
