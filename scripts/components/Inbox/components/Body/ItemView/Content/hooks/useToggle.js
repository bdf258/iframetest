import localStorageHelper, {
  getUserPreferences,
} from "../../../../../../../helpers/localStorageHelper";

import { useReducer } from "react";

const preferences = getUserPreferences();
const textPrefKey = "plainTextEmail";

const togglePlainText = (newValue) => {
  localStorageHelper.setItem("userPreferences", {
    ...preferences,
    [textPrefKey]: newValue,
  });
  return newValue;
};

const useToggle = () =>
  useReducer((x) => togglePlainText(!x), preferences[textPrefKey] || false);

export default useToggle;
