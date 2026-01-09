import localStorageHelper from "../../../../helpers/localStorageHelper";

const locale = localStorageHelper.getItem("installationPreferences").locale;

/*
  Calculates the top offset for the email editor
  This depends on the top nav bar's height
  The height of the top nav bar is different dependent on locale
*/
const topOffsetForLocale = () => {
  switch (locale) {
    case "en_CA":
    case "en_GB":
    case "cy_GB": {
      return 235;
    }
    case "en_AU": {
      return 215;
    }
    default: {
      return 215;
    }
  }
};

export const editorMinWidth = 780;
export const editorMaxWidth = 920;
export const editorTopOffset = topOffsetForLocale();
export const editorBottomOffset = 83;
export const quickReplyEditorBottomOffset = 163;

export const sliderMinWidth = 820;
// slider becomes 100% width
export const minViewPortWidth = 1500;

// slider becomes wider on larger screens
export const largerScreenWidth = 2000;

export const sliderWidthForLargerScreens = 45; // As a percentage

export default {
  editorBottomOffset,
  editorTopOffset,
  editorMinWidth,
  editorMaxWidth,
  sliderMinWidth,
  minViewPortWidth,
  largerScreenWidth,
  sliderWidthForLargerScreens,
};
