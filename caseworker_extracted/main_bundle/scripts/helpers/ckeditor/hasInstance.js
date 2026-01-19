/*global CKEDITOR */

export const hasCkeditorInstance = () =>
  !!(
    CKEDITOR &&
    CKEDITOR.instances &&
    CKEDITOR.instances[Object.keys(CKEDITOR.instances)[0]]
  );
