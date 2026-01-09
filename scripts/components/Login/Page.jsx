import { Card, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider, createUseStyles } from "react-jss";

import LanguageSelect from "../common/LanguageSelect/LanguageSelect.jsx";
import LoginBox from "./LoginBox.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api/public";
import intercomHelpers from "../../util/intercom.js";
import propTypes from "prop-types";
import { theme } from "../../../theme";

const useStyles = createUseStyles({
  card: {
    width: 400,
    boxShadow:
      "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: 20,
    padding: 30,
    margin: { top: 50 },
  },
  languageCard: {
    width: 420,
    boxShadow:
      "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: 20,
    padding: 20,
    margin: { top: 25 },
  },
});

const Login = (props) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [displayLanguageSelect, setDisplayLanguageSelect] = useState(true);

  useEffect(() => {
    if (window?.disableLanguageSelector) {
      setDisplayLanguageSelect(false);
    }

    // Check if Intercom is allowed at installation level first
    if (window?.allowIntercom) {
      // Installation allows it, now check user preference
      let intercomEnabled = true; // Default to enabled for guests
      try {
        const userPreferencesJson = localStorage.getItem('userPreferences');
        if (userPreferencesJson) {
          const userPreferences = JSON.parse(userPreferencesJson);
          intercomEnabled = userPreferences.enableIntercomMessenger !== false;
        }
      } catch (e) {
        // If JSON is malformed, default to enabled
        console.error('Failed to parse userPreferences from localStorage:', e);
      }
      
      if (intercomEnabled) {
        intercomHelpers.showForGuest();
      }

      return () => {
        if (intercomEnabled) {
          intercomHelpers.shutdown();
        }
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <FlexBox column={true}>
        <FlexBox hAlign="center">
          <Card className={classes.card}>
            <LoginBox api={api} onSuccess={props.onLogin} />
          </Card>
        </FlexBox>
        {displayLanguageSelect && (
          <FlexBox hAlign="center">
            <Card className={classes.languageCard}>
              <LanguageSelect
                customClassNames={{
                  container: classes.languageSelectInputContainer,
                }}
                onChange={(locale) => {
                  iln.setLocale(locale);
                }}
              />
            </Card>
          </FlexBox>
        )}
      </FlexBox>
    </ThemeProvider>
  );
};
Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};

export default Login;
