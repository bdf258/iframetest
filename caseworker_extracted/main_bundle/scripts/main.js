// import external dependencies
import "jquery";

import * as Sentry from "@sentry/react";

// import local dependencies
import Router from "./util/Router";
import admin from "./routes/admin";
import apikeys from "./routes/apiKeys";
import behalfs from "./routes/behalfs";
import cases from "./routes/cases";
import casespage from "./routes/casespage";
import casetemplatemanager from "./routes/casetemplatemanager";
import categorisationmanager from "./routes/categorisationmanager";
import common from "./routes/Common";
import constituents from "./routes/constituents";
import createcase from "./routes/createcase";
import customblockmanager from "./routes/customblockmanager";
import doorknock_results from "./routes/doorknockResults";
import doorknock_survey from "./routes/manageDoorknockSurveys";
import doorknock_users from "./routes/doorknockUsers";
import editemailtemplate from "./routes/editEmailTemplates";
import editletterhead from "./routes/editLetterhead";
import edittemplate from "./routes/edittemplate";
import flagmanager from "./routes/flagmanager";
import { getSentrySessionReplay } from "./helpers/localStorageHelper";
import globalstatistics from "./routes/globalStatistics";
import groups from "./routes/groups";
import importconstituents from "./routes/importconstituents";
import inbox from "./routes/inbox";
import index from "./routes/index";
import logout from "./routes/logout";
import mailmerge from "./routes/mailmerge";
import managecustomfields from "./routes/managecustomfields";
import manageflags from "./routes/manageFlags";
import managekmls from "./routes/managekmls";
import managesegmentfilters from "./routes/manageSegmentFilters";
import managesurveys from "./routes/manageSurveys";
import managetemplates from "./routes/manageTemplates";
import members from "./routes/members";
import newinbox from "./routes/newinbox";
import phonestatistics from "./routes/phoneStatistics";
import plugins from "./routes/plugins";
import rsstable from "./routes/rsstable";
import tagmanager from "./routes/tagmanager";
import test_advancedsearch from "./routes/advancedsearch";
import userpreferences from "./routes/userpreferences";
import users from "./routes/users";
import validate from "./routes/validate";
import viewcase from "./routes/viewcase";
import viewconstituent from "./routes/viewconstituent";

const writeletter = edittemplate;
const managelettertemplates = managetemplates;
const manageemailtemplates = managetemplates;
const manageletterheads = managetemplates;
const editletter = edittemplate;
const surveyresults = managesurveys;

if (process.env.NODE_ENV !== "development") {
  const sentrySessionReplayEnabled = getSentrySessionReplay();
  const sentryIntegrations = [];

  if (sentrySessionReplayEnabled) {
    sentryIntegrations.push(Sentry.replayIntegration());
  }

  Sentry.init({
    dsn: "https://f9efd76ffb54201c3b89d7b7c84c85eb@o4509286888833024.ingest.de.sentry.io/4509287666679888",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: sentryIntegrations,
    // Session Replay
    replaysSessionSampleRate: sentrySessionReplayEnabled ? 0.1 : undefined, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: sentrySessionReplayEnabled ? 1.0 : undefined, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur
    release: process.env.SENTRY_RELEASE_VERSION,
    environment: undefined,
  });
}

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
const routes = new Router({
  // All pages
  apikeys,
  behalfs,
  common,
  cases,
  casespage,
  casetemplatemanager,
  categorisationmanager,
  constituents,
  createcase,
  customblockmanager,
  doorknock_users,
  doorknock_results,
  doorknock_survey,
  edittemplate,
  editletterhead,
  editemailtemplate,
  admin,
  groups,
  importconstituents,
  globalstatistics,
  logout,
  mailmerge,
  managecustomfields,
  manageflags,
  managekmls,
  manageemailtemplates,
  manageletterheads,
  managelettertemplates,
  managesegmentfilters,
  managesurveys,
  members,
  newinbox,
  phonestatistics,
  writeletter,
  tagmanager,
  test_advancedsearch,
  inbox,
  index,
  userpreferences,
  plugins,
  rsstable,
  editletter,
  users,
  validate,
  viewcase,
  viewconstituent,
  flagmanager,
  surveyresults,
});

// Load Events
// eslint-disable-next-line no-undef
jQuery(document).ready(() => routes.loadEvents());
