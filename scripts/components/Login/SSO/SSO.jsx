import React, { useContext } from "react";

import Hr from "../../common/Hr";
import MicrosoftLoginButton from "./MicrosoftLoginButton";
import { TranslationContext } from "context/translate";
import { getInstallationPreferences } from "../../../helpers/localStorageHelper";
import propTypes from "prop-types";
import useStyles from "./SSO.styles";

const { microsoftSSOClientId } = getInstallationPreferences() || {};

const allowMicrosoftSSO =
  typeof microsoftSSOClientId === "string" &&
  microsoftSSOClientId.trim() !== "";

// if any SSO is enabled
const hasSSO = [allowMicrosoftSSO].some((x) => x);

const SSO = ({ api, onSuccess }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      {hasSSO && <Hr>{iln.gettext("or")}</Hr>}
      {allowMicrosoftSSO && (
        <div className={classes.sso}>
          <MicrosoftLoginButton
            api={api}
            onSuccess={onSuccess}
            clientId={microsoftSSOClientId}
          />
        </div>
      )}
    </React.Fragment>
  );
};

SSO.propTypes = {
  api: propTypes.exact({
    login: propTypes.func.isRequired,
    sso: propTypes.func.isRequired,
  }).isRequired,
  onSuccess: propTypes.func.isRequired,
};

export default SSO;
