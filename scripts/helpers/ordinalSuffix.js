import { locale } from "./localStorageHelper";

const getPluralRules = (locale) =>
  new Intl.PluralRules(locale, { type: "ordinal" });

let pr;

try {
  pr = getPluralRules(locale.replace("_", "-"));
} catch (e) {
  pr = getPluralRules("en-US");
}

const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

/**
 * Exposed interface: Attaches ordinal suffix to passed in number e.g 1 -> 1st, 2 -> 2nd, 103 -> 103rd
 * @public
 * @param {number} n - value to apply suffix to.
 * @returns {string} numberWithOrdinalSuffix - value with ordinal suffix applied.
 */
const formatOrdinals = (n) => {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

/**
 * Exposed interface: Returns ordinal suffix only for passed in number e.g 1 -> st, 2 -> nd, 103 -> rd
 * @public
 * @param {number} n - value to retrieve ordinal suffix for.
 * @returns {string} ordinalSuffixOnly - Ordinal suffix only.
 */
export const getOrdinalSuffixOnly = (n) => {
  const rule = pr.select(n);
  return suffixes.get(rule);
};

export default formatOrdinals;
