import {
  getInboxFilterOptions,
  userIdentity,
} from "../../../helpers/localStorageHelper";

import { anyoneInboxID } from "../components/Header/Filters/UserSelect/UserSelect.jsx";
import { isToday } from "date-fns";
import noPermissionConstituent from "../components/Body/ItemView/Details/consts/noPermissionConstituent";

let { filters: filtersFromLocalStorage, datetime } = getInboxFilterOptions();

const previousFilters = { ...filtersFromLocalStorage, page: 1 };

const initialState = {
  contactTypes: undefined,
  caseworkers: undefined,
  filters: {
    page: 1,
    amount: 50,
    contains: { value: "", type: "subject" },
    caseworkerID: userIdentity?.id ? parseInt(userIdentity.id) : anyoneInboxID,
    inboxType: "inbox",
    dir: "DESC",
    ...(isToday(new Date(datetime)) ? previousFilters : {}),
  },
  results: {
    items: undefined,
    pagination: {
      page: undefined,
      pages: undefined,
      rows: undefined,
    },
  },
  constituents: {
    noPermissionConstituent,
  },
  cases: {},
  selected: {},
  lastSelectedID: undefined,
  focusedID: undefined,
  organisationTypes: undefined,
  connectionTypes: undefined,
  roleTypes: undefined,
};

export default initialState;
