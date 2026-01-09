import {
  FormSelect,
  FormTextInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useMemo, useState } from "react";

import EmailSignaturesButton from "./EmailSignaturesButton/EmailSignaturesButton.jsx";
import LanguageSelect from "../../../common/LanguageSelect/LanguageSelect.jsx";
import NotificationPreferencesButton from "./NotificationPreferencesButton/NotificationPreferencesButton.jsx";
import SendFromAddressesButton from "./SendFromAddressesButton/SendFromAddressesButton.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import fontSizes from "../../../../consts/fontSizes.js";
import propTypes from "prop-types";
import useStyles from "./styles.js";
import { webSafeFonts } from "../../../../consts/fonts.js";
import { getInstallationPreferences } from "../../../../helpers/localStorageHelper";
import { allowIntercom } from "../../../../consts/disabledFeatures";

const isNumber = (string) => !isNaN(string) && parseInt(string);

const Preferences = ({ preferences, onChange }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const [displayLanguageSelect, setDisplayLanguageSelect] = useState(true);
  const isUKUser = useMemo(() => {
    const installationPrefs = getInstallationPreferences();
    if (!installationPrefs || !installationPrefs.locale) return false;
    
    // Only show Intercom control for UK installations (locale == en_GB)
    return installationPrefs.locale.toLowerCase() === 'en_gb';
  }, []);

  useEffect(() => {
    if (window?.disableLanguageSelector) {
      setDisplayLanguageSelect(false);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <br />
        <FormSelect
          name="emailFont"
          label={iln.gettext("Email Font")}
          value={preferences.emailFont}
          onChange={onChange}
          keepErrorSpacing={false}
          customClassNames={{
            label: classes.inputLabel,
            container: classes.inputContainer,
          }}
        >
          {webSafeFonts.map((f, idx) => (
            <option key={idx} value={f.type}>
              {f.label}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          name="emailFontSize"
          label={iln.gettext("Email Font Size")}
          value={preferences.emailFontSize}
          onChange={onChange}
          keepErrorSpacing={false}
          customClassNames={{
            label: classes.inputLabel,
            container: classes.inputContainer,
          }}
        >
          {fontSizes.map((size, idx) => (
            <option key={idx} value={size}>{`${size}pt`}</option>
          ))}
        </FormSelect>
        <SendFromAddressesButton />
        <EmailSignaturesButton />
        <br />
        <FormTextInput
          name="searchResultsPerPage"
          label={iln.gettext("Search Results per page")}
          value={preferences.searchResultsPerPage}
          onChange={({ target: { value } }) => {
            const parsedNumber = isNumber(value);
            if (parsedNumber) {
              if (parsedNumber <= 0) {
                onChange({
                  target: { value: 1, name: "searchResultsPerPage" },
                });
              } else if (parsedNumber > 1000) {
                onChange({
                  target: { value: 1000, name: "searchResultsPerPage" },
                });
              } else {
                onChange({
                  target: { value: parsedNumber, name: "searchResultsPerPage" },
                });
              }
            }
          }}
          keepErrorSpacing={false}
          customClassNames={{
            label: classes.inputLabel,
            container: classes.inputContainer,
          }}
        />
        <FormSelect
          name="viewCaseOrder"
          label={iln.gettext("Order of Case View")}
          value={preferences.viewCaseOrder}
          onChange={onChange}
          keepErrorSpacing={false}
          customClassNames={{
            label: classes.inputLabel,
            container: classes.inputContainer,
          }}
        >
          <option value="ASC">{iln.gettext("Ascending")}</option>
          <option value="DESC">{iln.gettext("Descending")}</option>
        </FormSelect>
        <br />
        <NotificationPreferencesButton />
        <br />
        {displayLanguageSelect && (
          <LanguageSelect
            customClassNames={{
              label: classes.inputLabel,
              container: classes.inputContainer,
            }}
            onChange={(locale) => {
              api.setLocale(locale, iln, modalActions).then(() => {
                iln.setLocale(locale);
              });
            }}
          />
        )}
        <br />
        {allowIntercom && isUKUser && (
          <FormSelect
            name="enableIntercomMessenger"
            label={
              <>
                {iln.gettext("Enable Casey")}
                <br />
                {iln.gettext("(Intercom Messenger)")}
              </>
            }
            value={preferences.enableIntercomMessenger !== false ? "enabled" : "disabled"}
            onChange={(e) => {
              const isEnabled = e.target.value === "enabled";
              onChange({
                target: {
                  name: "enableIntercomMessenger",
                  type: "checkbox",
                  checked: isEnabled,
                },
              });
            }}
            keepErrorSpacing={false}
            customClassNames={{
              label: classes.intercomLabel,
              container: classes.intercomContainer,
              select: classes.intercomSelect,
            }}
          >
            <option value="enabled">{iln.gettext("Enabled")}</option>
            <option value="disabled">{iln.gettext("Disabled")}</option>
          </FormSelect>
        )}
      </div>
    </div>
  );
};

Preferences.propTypes = {
  onChange: propTypes.func.isRequired,
  preferences: propTypes.object,
};

export default Preferences;
