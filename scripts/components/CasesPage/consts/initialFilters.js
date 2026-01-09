import {
  getCasesFilterOptions,
  getInstallationPreferences,
  getUserPreferences,
} from "../../../helpers/localStorageHelper";

import { getQueryStringParamMap } from "../../../helpers/queryString";
import { isToday } from "date-fns";
import { localDateToUTCString } from "../../../helpers/timezoneHelpers";

const { searchResultsPerPage: resultsPerPage = "20" } =
  getUserPreferences() || {};
const { casesFrom } = getInstallationPreferences() || {};

const today = new Date();
const from = localDateToUTCString(
  casesFrom ? new Date(`${casesFrom} 00:00:00`) : new Date(2000, 1, 1, 0, 0, 0)
);
const to = localDateToUTCString(
  new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
);

export const defaultFilters = {
  pageNo: 1,
  return: "columns",
  orderBy: "created",
  orderByDirection: "DESC",
  resultsPerPage,
  statusID: [],
  casetypeID: [],
  categorytypeID: [],
  contacttypeID: [],
  assignedToID: [],
  createdByID: [],
  behalfOf: [],
  customFields: {},
  constituentCriteria: {
    inPostalTown: [],
    inPostcode: [],
  },
  tagged: { searchType: "all", tagID: [] },
  notTagged: { searchType: "all", tagID: [] },
  dateRange: {
    type: "created",
    from,
    to,
  },
  columnsToReturn: {
    case: [
      "id",
      "created",
      "caseType",
      "category",
      "lastActioned",
      "createdBy",
      "summary",
      "tagged",
      "status",
      "reviewDate",
      "assignedInitials",
      "assignedTo",
      "enquirytype",
    ],
    constituent: ["id", "knownAs", "firstname", "surname", "organisationName", "isOrganisation"],
  },
};

const getPreviousFilters = () => {
  const { filters: previousFilters, datetime } = getCasesFilterOptions() || {};

  if (datetime && isToday(new Date(datetime))) return previousFilters;

  return {};
};

const getQueryStringFilters = () => {
  const { action, ...queryStringFilters } = Object.entries(
    Object.fromEntries(getQueryStringParamMap())
  ).reduce((allFilters, [key, value]) => {
    if (
      key in defaultFilters ||
      ["action", "datefrom", "dateto", "tagID"].includes(key)
    ) {
      switch (key) {
        case "action":
          return { ...allFilters, [key]: value };
        case "datefrom":
          return {
            ...allFilters,
            dateRange: {
              ...allFilters.dateRange,
              type: "created",
              from: `${value} 00:00:00`,
              to,
            },
          };
        case "dateto":
          return {
            ...allFilters,
            dateRange: {
              ...allFilters.dateRange,
              type: "created",
              to: `${value} 23:59:59`,
            },
          };
        case "tagID": {
          return {
            ...allFilters,
            tagged: {
              ...allFilters.tagged,
              searchType: "all",
              [key]: [parseInt(value)],
            },
          };
        }

        default: {
          return {
            ...allFilters,
            [key]: [parseInt(value)],
          };
        }
      }
    } else {
      return allFilters;
    }
  }, {});

  return action === "search" ? queryStringFilters : {};
};

const previousFilters = getPreviousFilters();

const queryStringFilters = getQueryStringFilters();

const initialFilters = {
  ...defaultFilters,
  ...previousFilters,
  ...queryStringFilters,
  ...{ resultsPerPage }, // ensure resultsPerPage from userPeferences is used
};

export default initialFilters;
