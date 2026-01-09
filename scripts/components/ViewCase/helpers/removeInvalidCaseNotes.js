/*
 * Removes invalid case notes returned from the backend
 * Use this as a place to document and fix any issues related to
 * case notes coming back with the incorrect data structure
 */

// Sometimes the backend returns case notes with details set to NULL.
// I THINK it is only case notes of type "reviewDate" that have this issue.
// This happens for the reviewDates endpoint as well.
// This will result in a crash on the front-end.
export const removeInvalidCaseNotes = (casenotes) =>
  casenotes.filter((casenote) => !!casenote?.detail);
