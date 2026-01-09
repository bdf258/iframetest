import DOMPurify from "dompurify";
import sanitiseHtmlConfig from "../consts/sanitiseHtmlConfig";

const sanitiseHtmlString = (string = "", configOverride = {}) =>
  DOMPurify.sanitize(string, { ...sanitiseHtmlConfig, ...configOverride });

export default sanitiseHtmlString;
