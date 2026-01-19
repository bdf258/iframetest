/*global CKEDITOR */

import { hasCkeditorInstance } from "./hasInstance";

export const getCurrentCkeditorInstance = () => {
  if (hasCkeditorInstance()) {
    // CKEDITOR returns a new instance name each time
    // this is the only way to get a reference to it
    return CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]];
  }
};

export const currentlyFocusedInstance = () => {
  if (hasCkeditorInstance()) {
    return CKEDITOR.currentInstance;
  }
};
