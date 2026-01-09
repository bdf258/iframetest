import * as msal from "@azure/msal-browser";

import React, { useContext, useMemo, useState } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import propTypes from "./MicrosoftLoginButton.propTypes.js";
import { setItem } from "../../../../helpers/localStorageHelper.js";
import useStyles from "./MicrosoftLoginButton.styles.js";
import { useTheme } from "react-jss";

const MicrosoftLoginButton = ({
  className,
  api,
  onSuccess,
  clientId,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const msalInstance = useMemo(
    () =>
      clientId
        ? new msal.PublicClientApplication({
            auth: {
              clientId,
              redirectUri: window.location.origin,
            },
          })
        : undefined,
    [clientId]
  );

  return (
    <div className={classes.microsoftContainer}>
      <div>
        <Button
          isDisabled={loading || !msalInstance}
          onClick={() => {
            setLoading(true);
            setError(undefined);
            msalInstance
              .loginPopup({
                scopes: [`${clientId}/.default`],
              })
              .then((msAuthResponse) =>
                api.sso({
                  JWT: msAuthResponse.accessToken,
                  locale: "en_GB",
                  type: "microsoft",
                })
              )
              .then((cwAuthResponse) => {
                for (const [key, value] of Object.entries(cwAuthResponse)) {
                  setItem(key, value);
                }

                onSuccess(cwAuthResponse.userIdentity);
              })
              .catch(async (e) => {
                const error = await e.json();
                setLoading(false);
                setError(error?.reason);
              });
          }}
          className={classnames(classes.microsoftLoginButton, className)}
          {...props}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
          >
            <title>MS-SymbolLockup</title>
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          <span>{iln.gettext("Sign in with Microsoft")}</span>
        </Button>
      </div>
      {error && <div className={classes.errorText}>{error}</div>}
    </div>
  );
};

MicrosoftLoginButton.propTypes = propTypes;

export default MicrosoftLoginButton;
