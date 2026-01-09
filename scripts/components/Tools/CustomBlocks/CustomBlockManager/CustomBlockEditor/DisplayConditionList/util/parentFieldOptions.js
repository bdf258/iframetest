import {
  categoryTypes,
  statusTypes,
} from "../../../../../../../helpers/localStorageHelper";
import { customFieldsForCustomBlockManager } from "./customFieldsForCustomBlockManager";

/**
 * Central config for how custom block display_conditions are displayed as UI.
 */

/**
 * @typedef {Object} ParetnObjectFieldOptions
 * @property {string} value - The value of the property that the Parent Object Field is stored under.
 * @property {string} text - The text that the user sees to describe the Parent Object Field.
 * @property {Object} localStorage - Data related to localStorage, the shape of the local storage pertaining to the Parent Object Field Options.
 * @property {Object} customBlock - The value that the options should be stored against when creating a custom block.
 * @property {Array} options - List of available options for the Parent Object Field, some come from localStorage, others are hardcoded.
 */

export default {
  cases: {
    categoryTypes: {
      value: "categoryTypes",
      text: "Category Type",
      localStorage: {
        displayText: "categorytype",
      },
      customBlock: {
        storedAgainst: "categoryID",
      },
      options: categoryTypes,
    },
    status: {
      value: "status",
      text: "Status Type",
      localStorage: {
        displayText: "statustype",
      },
      customBlock: {
        storedAgainst: "statusID",
      },
      options: statusTypes,
    },
    ...customFieldsForCustomBlockManager().cases,
  },
  constituents: {
    isOrganisation: {
      value: "isOrganisation",
      text: "Is Organisation",
      limitNumberOfOptionsThatCanBeSelectedTo: 1,
      localStorage: {
        displayText: "isOrganisation",
      },
      customBlock: {
        storedAgainst: "isOrganisation",
      },
      options: [
        {
          id: "true",
          isOrganisation: "True",
        },
        {
          id: "false",
          isOrganisation: "False",
        },
      ],
    },
    ...customFieldsForCustomBlockManager().constituent,
  },
};
