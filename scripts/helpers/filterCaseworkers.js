import { getUserIdentity } from "./localStorageHelper";

const { id: currentUserID } = getUserIdentity() || {};

/**
 * only show admin user if logged in user is admin
 *
 * keep if active === true
 * AND
 * current user ID === 1 (admin ID) OR caseworker ID NOT 1
 */
const filterCaseworkers = (caseworkers, includeCanvassingCaseworker = true) => 
  caseworkers.filter(
    (caseworker) =>
      caseworker.active &&
      (parseInt(currentUserID) === 1 || parseInt(caseworker.id) !== 1)
      && (includeCanvassingCaseworker || caseworker?.calluser === false)
  );

export default filterCaseworkers;
