/**
 * Checks if the supplied list of caseworkers have both an id and a name
 * Removes items that do not fulfill the above requirement
 * @param caseworkers
 * @returns {*[{id: string, name: string, active: string}]}
 */

export const removeMalformedCaseworkers = (caseworkers = []) =>
  caseworkers.filter(({ id, name }) => id && name);
