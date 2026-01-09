import localStorageHelper from "../../../../helpers/localStorageHelper";

const locale = localStorageHelper.getItem("installationPreferences").locale;

/*
  Calculates the top offset for the letter editor
  This depends on the top nav bar's height
  The height of the top nav bar is different dependent on locale
*/
const topOffsetForLocale = () => {
  switch (locale) {
    case "en_CA":
    case "en_GB":
    case "cy_GB": {
      return 285;
    }
    case "en_AU": {
      return 270;
    }
    default: {
      return 270;
    }
  }
};

export const editorMinWidth = 840;
export const editorMaxWidth = 930;
export const editorTopOffset = topOffsetForLocale();
export const editorBottomOffset = 205;

export const sliderMinWidth = 885;
// slider becomes 100% width
export const minViewPortWidth = 1650;

export default {
  editorBottomOffset,
  editorTopOffset,
  editorMinWidth,
  editorMaxWidth,
  sliderMinWidth,
  minViewPortWidth,
};
