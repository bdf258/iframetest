import {
  setCaseTypes as setCaseTypesLocalStorage,
  setCategoryType as setCategoryTypesLocalStorage,
  setStatusTypes as setStatusTypesLocalStorage,
} from "../../../../helpers/localStorageHelper";

import typeSort from "../helpers/typeSort";
import { useReducer } from "react";

const defaultInit = {
  categorytypes: undefined,
  casetypes: undefined,
  statustypes: undefined,
};

const updateLocalStorage = (values) => {
  values = values.filter(({ id }) => id !== undefined);

  if (values.every((v) => v.categorytype))
    setCategoryTypesLocalStorage(
      values.map((value) => ({ ...value, id: value.id }))
    );
  else if (values.every((v) => v.casetype))
    setCaseTypesLocalStorage(
      values.map((value) => ({ ...value, id: value.id }))
    );
  else if (values.every((v) => v.statustype))
    setStatusTypesLocalStorage(
      values.map((value) => ({ ...value, id: value.id }))
    );
};

const findIndex = (items, searchForID) =>
  items.findIndex(({ id: itemID }) => itemID === searchForID);

const replaceAtIndex = (array, index, replacement) => {
  array[index] = replacement;
  return [...array];
};

const removeAtIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_STATE": {
      return payload;
    }
    case "SET_CATEGORY_TYPES": {
      return { ...state, categorytypes: payload.sort(typeSort) };
    }
    case "ADD_CATEGORY_TYPE": {
      const newCategoryTypes = [...state.categorytypes, payload].sort(typeSort);
      updateLocalStorage(newCategoryTypes);
      return { ...state, categorytypes: newCategoryTypes };
    }
    case "UPDATE_CATEGORY_TYPE": {
      const newCategoryTypes = replaceAtIndex(
        state.categorytypes,
        findIndex(state.categorytypes, payload.id),
        payload
      ).sort(typeSort);
      updateLocalStorage(newCategoryTypes);
      return { ...state, categorytypes: newCategoryTypes };
    }
    case "REMOVE_CATEGORY_TYPE": {
      const newCategoryTypes = removeAtIndex(
        state.categorytypes,
        findIndex(state.categorytypes, payload.id)
      );
      updateLocalStorage(newCategoryTypes);
      return { ...state, categorytypes: newCategoryTypes };
    }
    case "SET_CASE_TYPES": {
      return { ...state, casetypes: payload.sort(typeSort) };
    }
    case "ADD_CASE_TYPE": {
      const newCaseTypes = [...state.casetypes, payload].sort(typeSort);
      updateLocalStorage(newCaseTypes);
      return { ...state, casetypes: newCaseTypes };
    }
    case "UPDATE_CASE_TYPE": {
      const newCaseTypes = replaceAtIndex(
        state.casetypes,
        findIndex(state.casetypes, payload.id),
        payload
      ).sort(typeSort);
      updateLocalStorage(newCaseTypes);
      return { ...state, casetypes: newCaseTypes };
    }
    case "REMOVE_CASE_TYPE": {
      const newCaseTypes = removeAtIndex(
        state.casetypes,
        findIndex(state.casetypes, payload.id)
      );
      updateLocalStorage(newCaseTypes);
      return { ...state, casetypes: newCaseTypes };
    }
    case "SET_STATUS_TYPES": {
      return { ...state, statustypes: payload.sort(typeSort) };
    }
    case "ADD_STATUS_TYPE": {
      const newStatusTypes = [...state.statustypes, payload].sort(typeSort);
      updateLocalStorage(newStatusTypes);
      return { ...state, statustypes: newStatusTypes };
    }
    case "UPDATE_STATUS_TYPE": {
      const newStatusTypes = replaceAtIndex(
        state.statustypes,
        findIndex(state.statustypes, payload.id),
        payload
      ).sort(typeSort);
      updateLocalStorage(newStatusTypes);
      return { ...state, statustypes: newStatusTypes };
    }
    case "REMOVE_STATUS_TYPE": {
      const newStatusTypes = removeAtIndex(
        state.statustypes,
        findIndex(state.statustypes, payload.id)
      );
      updateLocalStorage(newStatusTypes);
      return { ...state, statustypes: newStatusTypes };
    }
    default: {
      throw new Error(`Unrecognised type: "${type}"`);
    }
  }
};

const useCategorisationState = (initialState = defaultInit) =>
  useReducer(reducer, initialState);

export default useCategorisationState;
