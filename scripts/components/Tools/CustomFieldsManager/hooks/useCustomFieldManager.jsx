import { customFields as customFieldsLocalStorage } from "../../../../helpers/localStorageHelper";
import { useReducer } from "react";
import { validateCustomFields } from "../../../common/CustomFields/util/validCustomFieldsAsInputs";

const customFieldTemplate = {
  id: 0,
  name: "",
  filterable: false,
  filteredBy: 0,
  hideOnCreate: false,
  mappedToGroup: false,
  options: [{ id: 0, filterID: 0, group: "", text: "", blankOption: true }],
  orderNo: 0,
  type: "varchar",
  object: "cases",
  categories: [],
  block_id: null,
  removedOptions: [],
};

const customFieldsWithRemovedOptions = (customFields) =>
  customFields.map((customField) => ({
    ...customField,
    removedOptions: [],
  }));

const sortedCustomFields = (customFields) =>
  customFields.sort((a, b) =>
    a.orderNo > b.orderNo ? 1 : b.orderNo > a.orderNo ? -1 : 0
  );

const customFields = (customFieldsLocalStorage) => {
  const validatedCustomFields = validateCustomFields(customFieldsLocalStorage);
  const customFieldsWithRemovedOptionsAttached = customFieldsWithRemovedOptions(
    validatedCustomFields
  );
  return sortedCustomFields(customFieldsWithRemovedOptionsAttached);
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_VIEW": {
      return { ...state, view: payload };
    }
    case "SET_SELECTED_FIELD": {
      return { ...state, selectedField: payload };
    }
    case "UPDATE_SELECTED_FIELD": {
      return {
        ...state,
        selectedField: { ...state.selectedField, ...payload },
      };
    }
    case "SAVE_SELECTED_FIELD": {
      return {
        ...state,
        customFields: [...customFieldsWithRemovedOptions(payload)],
      };
    }
    case "RESET_DISPLAY_IN_BLOCK": {
      return {
        ...state,
        selectedField: {
          ...state.selectedField,
          block_id: null,
        },
      };
    }
    case "CREATE_NEW_FIELD": {
      return { ...state, selectedField: customFieldTemplate };
    }
  }
};

const useCustomFieldManager = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    view: "TABLE",
    customFields: customFields(customFieldsLocalStorage),
    ...initialState,
  });
  return [state, dispatch];
};

export default useCustomFieldManager;
