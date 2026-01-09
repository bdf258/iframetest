import { allFonts, webSafeFonts } from "../../consts/fonts";
import {
  getInstallationPreferences,
  getUserPreferences,
} from "../localStorageHelper";

import colorNamer from "color-namer";

const getUserCKEditorConfig = (type, options = {}) => {
  const { editorColors, editorFontSizes, CKEditorDefaultFont, PDFFontSize } =
    getInstallationPreferences() || {};
  const { emailFont, emailFontSize } = getUserPreferences() || {};

  const colours = Array.isArray(editorColors)
    ? Array.from(new Set(["000000", "FFFFFF"].concat(editorColors)))
    : [];

  const commonConfig = {
    fontSize_sizes: editorFontSizes.reduce(
      (all, next) => all + `${next}pt;`,
      ""
    ),
    colorButton_colors: colours.join(","),
    customColors: colours.map((color) => {
      color = `#${color}`;
      let name = colorNamer(color, { pick: "basic" }).basic.sort(
        (a, b) => a.distance - b.distance
      )[0].name;
      return [name, color];
    }),
    hasCustomColors: colours.length > 0 ? true : false,
  };

  switch (type) {
    case "email":
      return {
        ...commonConfig,
        extraPlugins:
          "panelbutton,colorbutton,autolink,button-link,signatureblock",
        contentsCss: "ckeditorv4/emailscss.php",
        colorButton_enableAutomatic: false,
        colorButton_enableMore: false,
        removePlugins: "elementspath, magicline",
        fontSize_defaultLabel: emailFontSize ? `${emailFontSize}pt` : undefined,
        font_defaultLabel: webSafeFonts.find(({ type }) => type === emailFont)
          ?.label,
        font_names: `${webSafeFonts
          .map((f) => `${f.label}/${f.family}`)
          .join(";")};`,
        ...options,
      };
    case "letter":
      return {
        ...commonConfig,
        removePlugins: "link,image",
        colorButton_enableMore: false,
        width: "21cm",
        line_height: "1;1.1;1.15;1.2;1.5;1.75;2",
        extraPlugins:
          "tabletools,tableresize,lineheight,colorbutton,printenvelope,autolink",
        removeButtons:
          "Cut,Copy,Paste,PasteText,Undo,Redo,Anchor,Strike,Subscript,Superscript,Source,Format,Styles,SpecialChar,PasteText",
        fontSize_defaultLabel: PDFFontSize ? `${PDFFontSize}pt` : undefined,
        font_defaultLabel: allFonts.find(
          ({ type }) => type === CKEditorDefaultFont
        )?.label,
        font_names: `${allFonts
          .map((f) => `${f.label}/${f.family}`)
          .join(";")};`,
        ...options,
      };
    default:
      return { ...commonConfig, ...options };
  }
};

export default getUserCKEditorConfig;
