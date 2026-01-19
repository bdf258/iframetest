import { renameCaseworkerFromLocalStorage } from "./renameAdminUser";

/**
 * Store an object against a key string.
 * @param {String} name - The string key that the object will be stored against.
 * @param {Object} object - The object to be stored in local storage.
 */
export const setItem = (name, object) => {
  localStorage.setItem(name, JSON.stringify(object));
};

/**
 * Gets the object stored against the key.
 * @param {String} name - The key used to look up localStorage.
 * @returns {Object} - The object stored against that key or null if nothing is present.
 */
export const getItem = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

/**
 * Clears all items in localStorage.
 */
export const removeAll = () => {
  Object.keys(localStorage).forEach((key) => localStorage.removeItem(key));
};

/**
 * Gets the object stored against the "casesPageFilterOptions" key.
 * @returns {Object} - The object stored against the "casesPageFilterOptions" key or null if nothing is present.
 */
export const casesFilterOptions = getItem("casesPageFilterOptions");

/**
 * Gets the object stored against the "casesPageFilterOptions" key.
 * @returns {Object} - The object stored against the "casesPageFilterOptions" key or null if nothing is present.
 */
export const getCasesFilterOptions = () => getItem("casesPageFilterOptions");

/**
 * set the object stored against the "casesPageFilterOptions" key.
 * @returns {Object} - The object stored against the "casesPageFilterOptions" key or null if nothing is present.
 */
export const setCasesFilterOptions = (payload) =>
  setItem("casesPageFilterOptions", payload);

/**
 * The object stored against the "disabledFeatures" key.
 * @returns {Object} - The object stored against the "disabledFeatures" key or null if nothing is present.
 */
export const disabledFeatures = getItem("disabledFeatures");
export const getDisabledFeatures = () => getItem("disabledFeatures");

/**
 * The object stored against the "casetypes" key.
 * @returns {Object} - The object stored against the "casetypes" key or null if nothing is present.
 */
const caseTypesKey = "casetypes";
export const caseTypes = getItem(caseTypesKey);
export const getCaseTypes = () => getItem(caseTypesKey);
export const setCaseTypes = (value) => setItem(caseTypesKey, value);

/**
 * The object stored against the "inboxPageFilterOptions" key.
 * @returns {Object} - The object stored against the "inboxPageFilterOptions" key or null if nothing is present.
 */
const inboxPageFilterOptionsKey = "inboxPageFilterOptions";
export const inboxFilterOptions = getItem(inboxPageFilterOptionsKey) || {};
export const getInboxFilterOptions = () =>
  getItem(inboxPageFilterOptionsKey) || {};
export const setInboxFilterOptions = (value = {}) =>
  setItem(inboxPageFilterOptionsKey, value);

/**
 * The object stored against the "installationPreferences" key.
 * @returns {Object} - The object stored against the "installationPreferences" key or null if nothing is present.
 */
export const installationPreferences = getItem("installationPreferences");

/**
 * The object stored against the "installationPreferences" key.
 * @returns {Object} - The object stored against the "installationPreferences" key or null if nothing is present.
 */
export const getInstallationPreferences = () =>
  getItem("installationPreferences");

/**
 * The object stored against the "userIdentity" key.
 * @returns {Object} - The object stored against the "userIdentity" key or null if nothing is present.
 */
export const userIdentity = getItem("userIdentity");
export const getUserIdentity = () => getItem("userIdentity");

/**
 * The object stored against the "masterConfig" key.
 * @returns {Object} - The object stored against the "masterConfig" key or null if nothing is present.
 */
export const masterConfig = getItem("masterConfig");
export const getMasterConfig = () => getItem("masterConfig");

/**
 * The object stored against the "enquirytypes" key.
 * @returns {Object} - The object stored against the "enquirytypes" key or null if nothing is present.
 */
export const enquiryTypes = getItem("enquirytypes");

/**
 * The object stored against the "membershipTypes" key.
 * @returns {Object} - The object stored against the "membershipTypes" key or null if nothing is present.
 */
export const membershipTypes = getItem("membershipTypes");

export const membershipEnabled = installationPreferences?.membershipEnabled;

/**
 * The object stored against the "donationTypes" key.
 * @returns {Object} - The object stored against the "donationTypes" key or null if nothing is present.
 */
export const donationTypes = getItem("donationTypes");

/**
 * The object stored against the "contacttypes" key.
 * @returns {Object} - The object stored against the "contacttypes" key or null if nothing is present.
 */
export const getContactTypes = () => getItem("contacttypes");
export const contactTypes = getItem("contacttypes");

/**
 * The object stored against the "govDepartments" key.
 * @returns {Object} - The object stored against the "govDepartments" key or null if nothing is present.
 */
export const govDepartments = getItem("govDepartments");

/**
 * The object stored against the "donationMethods" key.
 * @returns {Object} - The object stored against the "donationMethods" key or null if nothing is present.
 */
export const donationMethods = getItem("donationMethods");

/**
 * The object stored against the "statusTypes" key.
 * @returns {Object} - The object stored against the "statusTypes" key or null if nothing is present.
 */
const statusTypesKey = "statustypes";
export const statusTypes = getItem(statusTypesKey);
export const setStatusTypes = (value) => setItem(statusTypesKey, value);

/**
 * Get the object stored against the "statusTypes" key.
 * @returns {Object} - The object stored against the "statusTypes" key or null if nothing is present.
 */
export const getStatusTypes = () => getItem("statustypes");

/**
 * The object stored against the "caseworkers" key. A new caseworker could be added which wouldn't be
 * updated  via localstorage until the user logs in again  get caseworkers via api instead.
 * @returns {Object} - The object stored against the "caseworkers" key or null if nothing is present.
 */
export const caseworkers = renameCaseworkerFromLocalStorage(
  getItem("caseworkers")
);

/**
 * Gets the object stored against the "caseworkers" key. A new caseworker could be added which wouldn't be
 * updated  via localstorage until the user logs in again  get caseworkers via api instead.
 * @returns {Object} - The object stored against the "caseworkers" key or null if nothing is present.
 */
export const getCaseworkers = () =>
  renameCaseworkerFromLocalStorage(getItem("caseworkers")) || [];

/**
 * The object stored against the "donationSources" key.
 * @returns {Object} - The object stored against the "donationSources" key or null if nothing is present.
 */
export const donationSources = getItem("donationSources");

/**
 * The object stored against the "categorytypes" key.
 * @returns {Object} - The object stored against the "categorytypes" key or null if nothing is present.
 */
const categoryTypesKey = "categorytypes";
export const categoryTypes = getItem(categoryTypesKey);
export const getCategoryTypes = () => getItem(categoryTypesKey);
export const setCategoryType = (value) => setItem(categoryTypesKey, value);

/**
 * The object stored against the "userPreferences" key.
 * @returns {Object} - The object stored against the "userPreferences" key or null if nothing is present.
 */
const userPreferencesKey = "userPreferences";
export const userPreferences = getItem(userPreferencesKey);
export const getUserPreferences = () => getItem(userPreferencesKey);
export const setUserPreferences = (value) => setItem(userPreferencesKey, value);

/**
 * The object stored against the "caseworkerID" key.
 * @returns {Object} - The object stored against the "caseworkerID" key or null if nothing is present.
 */
export const caseworkerID =
  getItem("userIdentity") == null ? false : getItem("userIdentity").id;

/**
 * Get the object stored against the "lastCreatedCase" key.
 * @returns {Object} - The object stored against the "lastCreatedCase" key or null if nothing is present.
 */
export const getLastCreatedCase = () => getItem("lastCreatedCase");

/**
 * The object stored against the "exportCsvFields" key.
 * @returns {Object} - The object stored against the "exportCsvFields" key or null if nothing is present.
 */
export const exportCsvFields = getItem("exportCsvFields");
export const getExportCsvFields = () => getItem("exportCsvFields");

/**
 * Set the object stored against the "exportCsvFields" key.
 * @returns {Object} - The object stored against the "exportCsvFields" key or null if nothing is present.
 */
export const setExportCsvFields = (payload) =>
  setItem("exportCsvFields", payload);

/**
 * The object stored against the "exportCsvFields" key.
 * @returns {Object} - The object stored against the "casesPageOptions" key or null if nothing is present.
 */
export const casesPageOptions = getItem("casesPageOptions");

/**
 * The object stored against the "lastUsedScanSource" key.
 * @returns {Object} - The object stored against the "lastUsedScanSource" key or null if nothing is present.
 */
export const getLastUsedScanSource = () => getItem("lastUsedScanSource");

/**
 * The setter and getter for localStorage against the "previousLanguage" key.
 */
const languageKey = "previousLanguage";
/**
 * The object stored against the "previousLanguage" key.
 * @returns {Object} - The object stored against the "previousLanguage" key or null if nothing is present.
 */
export const getLanguage = () => getItem(languageKey);
/**
 * Set the object stored against the "previousLanguage" key.
 */
export const setLanguage = (payload) =>
  localStorageHelper.setItem(languageKey, payload);

const contactDetailTypesKey = "contactDetailTypes";
export const contactDetailTypes = getItem(contactDetailTypesKey);
export const getContactDetailTypes = () => getItem(contactDetailTypesKey);
export const setContactDetailTypes = (payload) =>
  setItem("customFields", payload);

/**
 * The object stored against the "locale" key.
 * @returns {Object} - The object stored against the "locale" key or null if nothing is present.
 */
const localeKey = "locale";
export const locale = getItem(localeKey);
export const getLocale = () => getItem(localeKey);

/**
 * Clears keys passed in an array from the localStorage.
 */
export const removeItems = (keysArray) => {
  keysArray.forEach((key) => localStorage.removeItem(key));
};

export const getPermissionOptions = () =>
  installationPreferences.permissionOptions;

/**
 * The object stored against the "gender" key.
 *
 * @returns {Object} - The object stored against the "gender" key or null if nothing is present.
 */
export const genders = getItem("genders");
export const getGenders = () => getItem("genders");

/**
 * The object stored against the "sentrySessionReplay" key.
 *
 * @returns {bool} - The object stored against the "sentrySessionReplay" key or false if nothing is present.
 */
const sentrySessionReplayKey = "sentrySessionReplay";
export const sentrySessionReplay = getItem(sentrySessionReplayKey) || false;
export const getSentrySessionReplay = () =>
  getItem(sentrySessionReplayKey) || false;

/**
 * The object stored against the "customFields" key.
 * @returns {Object} - The object stored against the "customFields" key or null if nothing is present.
 */
export const customFields = getItem("customFields") || [];
export const getCustomFields = () => getItem("customFields") || [];

/**
 * The object stored against the "customField_blocks" key.
 * @returns {Object} - The object stored against the "customField_blocks" key or null if nothing is present.
 */
export const customFieldBlocks = getItem("customField_blocks") || [];
export const getCustomFieldBlocks = () => getItem("customField_blocks") || [];

const previousQuickReplyFieldsKey = "previousQuickReplyFields";
export const previousQuickReplyFields =
  getItem(previousQuickReplyFieldsKey) || {};
export const getPreviousQuickReplyFields = () =>
  getItem(previousQuickReplyFieldsKey) || {};
export const setPreviousQuickReplyFields = (payload) =>
  setItem(previousQuickReplyFieldsKey, payload);

const localStorageHelper = {
  getItem,
  setItem,
  removeAll,
  removeItems,
};

export default localStorageHelper;
