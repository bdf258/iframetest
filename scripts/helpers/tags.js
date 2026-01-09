/** @module tag helpers */

/**
 * Exposed interface: Get the total number of cases present on the passed in tagList.
 * @public
 * @param {{label: string, count:number}[]} tagList - list of tags cases are totaled from.
 * @returns {Number} totalCases - the total number of cases on the passed in tagList.
 */
const getTotalTagCountForCases = (tagList) => {
  return parseInt(
    tagList.reduce((acc, { count }) => acc + count, 0),
    10
  );
};

/**
 * Exposed interface: removes specified duplicate tags (by id matching) from the passed in list.
 * @public
 * @param {{label: string, count:number, id: number}[]} tagList - List of cases to remove specified duplicates from.
 * @param {{label: string, count:number, id: number}} tagToRemove - The tag to remove.
 * @returns {{label: string, count:number, id: number}[]} totalCases - Deduped tag list.
 */
const removeDuplicateTags = (tagList, tagToRemove) => {
  return tagList.filter((tag) => tag.id !== tagToRemove.id);
};

/**
 * Exposed interface: checks if any tags from passed in @param tagListToCheckAgainst match tags passed in with @param tagListToCheck.
 * @param {{tag:string, id: string}[]} tagListToCheckAgainst - List of tags to check for duplicate tags within.
 * @param {{tag:string, id: string}[]} tagListToCheck - List of tags to check for duplicate tags within.
 * @returns {boolean}
 */
const tagListHasDuplicateTags = (tagListToCheckAgainst, tagListToCheck) => {
  return !!tagListToCheckAgainst.filter(
    (tag) => !tagListToCheck.find(({ id }) => tag.id === id)
  );
};

/**
 * Exposed interface: returns deduped list of tags.
 * @param {{tag:string, id: string}[]} tagListToDedupe - List of tags to dedupe.
 * @param {{tag:string, id: string}[]} tagListToCheck - List of tags to check against.
 * @returns {{tag:string, id: string}[]}
 */
const tagListDedupe = (tagListToDedupe, tagListToCheck) => {
  return tagListToDedupe.filter(
    (tag) => !tagListToCheck.find(({ id }) => tag.id === id)
  );
};

/**
 * Exposed interface: return first tag from list that matches exactly the input value (compares tag name in @param tagList with @param tagName)
 * @param {string} tagName - name of the tag to search for.
 * @param {{tag:string, id: string}[]} tagList - List of tags to search.
 * @returns {{tag:string, id: string}} return the matching tag.
 */
const getMatchingTag = (tagName, tagList) => {
  return tagList.find(({ tag }) => tag === tagName);
};

export {
  getTotalTagCountForCases,
  removeDuplicateTags,
  tagListHasDuplicateTags,
  tagListDedupe,
  getMatchingTag,
};
