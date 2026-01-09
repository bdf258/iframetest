/** @module flag helpers */

/**
 * Exposed interface: Get the total number of cases present on the passed in flagList.
 * @public
 * @param {{label: string, count:number}[]} flagList - list of flags cases are totaled from.
 * @returns {Number} totalConstituents - the total number of cases on the passed in flagList.
 */
const getTotalFlagCountForConstituents = (flagList) => {
  return parseInt(
    flagList.reduce((acc, { count }) => acc + count, 0),
    10
  );
};

/**
 * Exposed interface: removes specified duplicate flags (by id matching) from the passed in list.
 * @public
 * @param {{label: string, count:number, id: number}[]} flagList - List of cases to remove specified duplicates from.
 * @param {{label: string, count:number, id: number}} flagToRemove - The flag to remove.
 * @returns {{label: string, count:number, id: number}[]} totalConstituents - Deduped flag list.
 */
const removeDuplicateFlags = (flagList, flagToRemove) => {
  return flagList.filter((flag) => flag.id !== flagToRemove.id);
};

/**
 * Exposed interface: checks if any flags from passed in @param flagListToCheckAgainst match flags passed in with @param flagListToCheck.
 * @param {{flag:string, id: string}[]} flagListToCheckAgainst - List of flags to check for duplicate flags within.
 * @param {{flag:string, id: string}[]} flagListToCheck - List of flags to check for duplicate flags within.
 * @returns {boolean}
 */
const flagListHasDuplicateFlags = (flagListToCheckAgainst, flagListToCheck) => {
  return !!flagListToCheckAgainst.filter(
    (flag) => !flagListToCheck.find(({ id }) => flag.id === id)
  );
};

/**
 * Exposed interface: returns deduped list of flags.
 * @param {{flag:string, id: string}[]} flagListToDedupe - List of flags to dedupe.
 * @param {{flag:string, id: string}[]} flagListToCheck - List of flags to check against.
 * @returns {{flag:string, id: string}[]}
 */
const flagListDedupe = (flagListToDedupe, flagListToCheck) => {
  return flagListToDedupe.filter(
    (flag) => !flagListToCheck.find(({ id }) => flag.id === id)
  );
};

/**
 * Exposed interface: return first flag from list that matches exactly the input value (compares flag name in @param flagList with @param flagName)
 * @param {string} flagName - name of the flag to search for.
 * @param {{flag:string, id: string}[]} flagList - List of flags to search.
 * @returns {{flag:string, id: string}} return the matching flag.
 */
const getMatchingFlag = (flagName, flagList) => {
  return flagList.find(({ flag }) => flag === flagName);
};

export {
  getTotalFlagCountForConstituents,
  removeDuplicateFlags,
  flagListHasDuplicateFlags,
  flagListDedupe,
  getMatchingFlag,
};
