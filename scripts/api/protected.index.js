import * as kmlsAPI from "./src/kmls";

import SMSAPI from "./src/sms";
import authAPI from "./src/auth";
import behalfAPI from "./src/behalfApi";
import bulkActionsAPI from "./src/bulkActions";
import caseAPI from "./src/case";
import caseTemplatesAPI from "./src/casetemplates";
import casenotesAPI from "./src/casenotes";
import casesAPI from "./src/cases";
import caseworkersAPI from "./src/caseworkers";
import categorisationsAPI from "./src/categorisations.js";
import connectionsAPI from "./src/connections";
import constituentsAPI from "./src/constituents";
import contactsAPI from "./src/contacts";
import customFieldsAPI from "./src/customFields.js";
import doorknockingAPI from "./src/doorknocking";
import electoralRollAPI from "./src/electoralRoll.js";
import emailAPI from "./src/emails";
import emailAddressesAPI from "./src/emailAddresses.js";
import emailSignaturesAPI from "./src/emailSignatures";
import emailTemplatesAPI from "./src/emailTemplates";
import fileAPI from "./src/file";
import flagsAPI from "./src/flags";
import flattenAPIs from "./src/util/flattenAPIs";
import groupsAPI from "./src/groupsApi";
import inboxAPI from "./src/inbox.js";
import letterAPI from "./src/letter";
import letterHeadAPI from "./src/letterHeads";
import letterTemplatesAPI from "./src/letterTemplates";
import localeAPI from "./src/locale";
import membership from "./src/membership";
import organisationsAPI from "./src/organisations.js";
import pluginsAPI from "./src/plugins.js";
import restrictions from "./src/restrictions";
import reviewDatesAPI from "./src/reviewDates";
import rssAPI from "./src/rss.js";
import searchAPI from "./src/search.js";
import segments from "./src/segments";
import special_fileDropUploadAPI from "./src/specialCases/fileDropUpload";
import surveyAPI from "./src/surveys";
import tagsAPI from "./src/tags";
import typesAPI from "./src/types.js";
import userPreferencesAPI from "./src/userPreferences";

const api = flattenAPIs(
  authAPI,
  behalfAPI,
  bulkActionsAPI,
  caseAPI,
  caseTemplatesAPI,
  casenotesAPI,
  casesAPI,
  caseworkersAPI,
  categorisationsAPI,
  connectionsAPI,
  constituentsAPI,
  contactsAPI,
  customFieldsAPI,
  doorknockingAPI,
  electoralRollAPI,
  emailAPI,
  emailSignaturesAPI,
  emailTemplatesAPI,
  fileAPI,
  kmlsAPI,
  groupsAPI,
  inboxAPI,
  letterAPI,
  letterTemplatesAPI,
  membership,
  organisationsAPI,
  pluginsAPI,
  rssAPI,
  reviewDatesAPI,
  special_fileDropUploadAPI,
  tagsAPI,
  flagsAPI,
  letterHeadAPI,
  userPreferencesAPI,
  restrictions,
  segments,
  searchAPI,
  SMSAPI,
  surveyAPI,
  typesAPI,
  localeAPI,
  emailAddressesAPI
);

export default api;
