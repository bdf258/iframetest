/*global __CACHEBUST__ */

import React, { useEffect, useState } from "react";
import {
  getInstallationPreferences,
  getLanguage as getPreviousLanguage,
  setLanguage as setPreviousLanguage,
} from "../../helpers/localStorageHelper.js";

import ComponentLoading from "../../components/ComponentLoading.jsx";
import TranslationContext from "context/translate";
import ilnConstruct from "../../util/gettext.js";
import propTypes from "prop-types";

const iln = ilnConstruct();

const previousLanguage = getPreviousLanguage();
const { locale: installationDefaultLanguage } =
  getInstallationPreferences() || {};
const initialLocale =
  previousLanguage || installationDefaultLanguage || "en_GB";

const languageFromLocale = (language) => {
  switch (language) {
    case "cy_GB": {
      return "cy";
    }
    default: {
      return language;
    }
  }
};

const loadSelectedLanguage = (locale) =>
  fetch(
    `locales/${languageFromLocale(locale)}.json?cachebust=${__CACHEBUST__}`
  ).then((po) => po.json());

const TranslationProvider = ({ children }) => {
  const [translationLoading, setTranslationLoading] = useState(true);
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    setTranslationLoading(true);
    loadSelectedLanguage(locale)
      .then((po) => {
        iln.loadJSON(po);
        iln.setLocale(locale);
      })
      .finally(() => {
        setTranslationLoading(false);
      });
  }, [locale]);

  if (translationLoading) {
    return <ComponentLoading />;
  }

  return (
    <TranslationContext.Provider
      value={{
        ...iln,
        setLocale: (locale) => {
          setLocale(locale);
          setPreviousLanguage(locale);
        },
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};
export default TranslationProvider;
