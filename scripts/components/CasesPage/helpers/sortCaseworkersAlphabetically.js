export const sortCaseworkersAlphabetically = (caseworkers) =>
  caseworkers.sort((a, b) => a.name.localeCompare(b.name));
