import { getDisabledFeatures } from "../helpers/localStorageHelper";

/**
 * Takes the disabled features array from local storage and
 * converts it to an object using the disabled feature string
 * as a key paired to a value of true.
 */
const disabledFeatures = (getDisabledFeatures() || []).reduce(
  (all, next) => ({ ...all, [next]: true }),
  {}
);

const checkAllowed = (key) => !(key in disabledFeatures);

/**
 * If the feature string is not a key in the disabledFeatures object then
 * it is allowed.
 */
export const allowPermissionSystem = checkAllowed("permissionSystem");
export const allowSurveyTools = checkAllowed("Survey Tools");
export const allowEmailStatistics = checkAllowed("Email Statistics");
export const allowUnsubscribeLink = checkAllowed("Unsubscribe Link");
export const allowElectoralRollTable = checkAllowed("Electoral Roll Table");
export const allowMembershipList = checkAllowed("membership list");
export const allowUnassignedInbox = checkAllowed("unassigned inbox");
export const allowSegments = checkAllowed("Segments");
export const allowPhysicalAddress = checkAllowed("Physical Address");
export const allowSocialMedia = checkAllowed("Social Media");
export const allowAusPostBarcodes = checkAllowed("AusPostBarcodes");
export const allowRecentAppearances = checkAllowed("Recent Appearances");
export const allowAdvancedEditor = checkAllowed("unlayerEditor");
export const allowPhoneStatistics = checkAllowed("Phone Statistics");
export const allowCanvassUsers = checkAllowed("Canvass Users");
export const allowEmailAddressSearch = checkAllowed("emailAddressSearch");
export const allowSurgeryBookings = checkAllowed("surgeryBookings");
export const allowLetterheads = checkAllowed("letterheads");
export const allowReferences = checkAllowed("References");
export const allowLegacyDoorKnocking = checkAllowed("legacyDoorKnocking");
export const allowDoorknocking = checkAllowed("Doorknocking");
export const allowInboxSuggestChangedEmail = checkAllowed(
  "Inbox suggest Changed Email"
);
export const allowScheduledEmails = checkAllowed("Scheduled Emails");
export const allowPersonalFlags = checkAllowed("Personal Flags");
export const allowMergeRegisteredOnly = checkAllowed("Merge registered Only");
export const allowMembershipSecondaryBranch = checkAllowed(
  "membershipSecondaryBranch"
);
export const allowEditConstituency = checkAllowed("editConstituency");
export const allowRelatesTo = checkAllowed("RelatesTo");
export const allowBehalfOf = checkAllowed("behalfOf");
export const allowGlobalStatistics = checkAllowed("globalStatistics");
export const allowAttachmentsWithBulkEmails = checkAllowed(
  "attachmentsWithBulkEmails"
);
export const allowIntercom = checkAllowed("intercom");
