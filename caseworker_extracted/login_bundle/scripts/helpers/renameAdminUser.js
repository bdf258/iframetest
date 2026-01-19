/**
 * LocalStorage Implementation: Replaces admins username(id: 1) with "System".
 * @param {Array<Object>} caseworkers - List of caseworkers.
 * @returns {Array<Object>|undefined} caseworkers - New list of caseworkers with admins name set as system if it exists.
 */

export const renameCaseworkerFromLocalStorage = (caseworkers) => {
  if (!caseworkers) return;
  const adminUserIndex = caseworkers.findIndex((user) => user.ID === 1);

  if (adminUserIndex === -1) return caseworkers;

  caseworkers[adminUserIndex].caseworkerName = "System";

  return caseworkers;
};

/**
 * API Implementation: Replaces admins username(id: 1) with "System".
 * @param {Array<Object>} caseworkers - List of caseworkers.
 * @returns {Array<Object>} caseworkers - New list of caseworkers with admins name set as system if it exists.
 */

export const renameCaseworkerFromApi = (caseworkers) => {
  if (caseworkers === null) return;
  const adminUserIndex = caseworkers.findIndex((user) => user.id === 1);

  if (adminUserIndex === -1) return caseworkers;

  caseworkers[adminUserIndex].name = "System";

  return caseworkers;
};
