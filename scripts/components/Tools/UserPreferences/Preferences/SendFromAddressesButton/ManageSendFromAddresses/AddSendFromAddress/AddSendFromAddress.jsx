import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ComponentLoading from "../../../../../../ComponentLoading.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { getInstallationPreferences } from "@electedtech/helpers/localStorageHelper.js";
import { isEmail } from "@electedtech/helpers/isEmailRegex";
import propTypes from "prop-types";
import useStyles from "../styles.js";
import { useTheme } from "react-jss";

const emailAlreadyInUse = ({ emailAddress, existingEmailAddresses }) => {
  for (let i = 0; i < existingEmailAddresses.length; i++) {
    if (
      emailAddress.trim().toLowerCase() ===
      existingEmailAddresses[i].trim().toLowerCase()
    ) {
      return true;
    }
  }
  return false;
};

const getInvalidDomain = ({
  emailAddress,
  disallowedAltSenderDomains,
  allowedAltSenderDomains,
}) =>
  allowedAltSenderDomains.length > 0
    ? emailAddress.match(/@(.+)/)[1]
    : disallowedAltSenderDomains.reduce(
        (result, domain) =>
          emailAddress.toLowerCase().includes(domain)
            ? (result += domain)
            : result,
        ""
      );
const hasDisallowedDomain = ({
  emailAddress,
  disallowedAltSenderDomains,
  allowedAltSenderDomains,
}) => {
  const check = (domain) =>
    emailAddress
      .toLowerCase()
      .includes(domain.includes(".") ? "@" + domain : "@" + domain + ".");
  return allowedAltSenderDomains.length > 0
    ? !allowedAltSenderDomains.some(check)
    : disallowedAltSenderDomains.some(check);
};

const submitEmailForValidation = ({
  emailAddress,
  modalActions,
  allowedAltSenderDomains,
  disallowedAltSenderDomains,
  iln,
  setView,
  setError,
  setFetching,
  existingEmailAddresses,
}) => {
  setFetching(true);
  setError();
  if (emailAlreadyInUse({ emailAddress, existingEmailAddresses })) {
    setFetching(false);
    setError(iln.gettext("You can send from this email address already."));
  } else if (!isEmail(emailAddress)) {
    setFetching(false);
    setError(iln.gettext("Please enter a valid email address."));
  } else if (
    hasDisallowedDomain({
      emailAddress,
      disallowedAltSenderDomains,
      allowedAltSenderDomains,
    })
  ) {
    setFetching(false);
    setError(
      iln.gettext(
        "Sending from '@%1' is restricted. Please try a different sending address.",
        getInvalidDomain({
          emailAddress,
          disallowedAltSenderDomains,
          allowedAltSenderDomains,
        })
      )
    );
  } else {
    api
      .requestSendFromAddress(emailAddress, modalActions, iln)
      .then(() => {
        setView("success");
      })
      .catch((e) => {
        setFetching(false);
        e.status === 409
          ? setError(
              iln.gettext("You can send from this email address already.")
            )
          : setError(iln.gettext("An error occurred, please try again."));
      });
  }
};

const AddSendFromAddress = ({ existingEmailAddresses, modalID }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [view, setView] = useState("emailInput");
  const [emailAddress, setEmailAddress] = useState("");
  const [fetching, setFetching] = useState();
  const [error, setError] = useState();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const disallowedAltSenderDomains =
    getInstallationPreferences().disallowedAltSenderDomains;
  const allowedAltSenderDomains =
    getInstallationPreferences().allowedAltSenderDomains;
  return (
    <div className={classes.modal}>
      <Switcher selected={view}>
        {{
          emailInput: (
            <React.Fragment>
              <FormTextInput
                name="emailAddress"
                label={iln.gettext("Email Address")}
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                error={error}
                customClassNames={{ container: classes.textInputContainer }}
              />
              {fetching ? (
                <ComponentLoading />
              ) : (
                <FlexBox hAlign="flex-end">
                  <Button
                    onClick={() =>
                      submitEmailForValidation({
                        existingEmailAddresses,
                        emailAddress,
                        allowedAltSenderDomains,
                        disallowedAltSenderDomains,
                        modalActions,
                        iln,
                        setView,
                        setError,
                        setFetching,
                      })
                    }
                  >
                    Add
                  </Button>
                </FlexBox>
              )}
            </React.Fragment>
          ),
          success: (
            <div>
              <p>
                {iln.gettext("An email has been successfully sent to")}{" "}
                <b>{emailAddress}</b>,{" "}
                {iln.gettext(
                  "follow the instructions within the email to verify you have permission to send on behalf of this address."
                )}
              </p>
              <p>
                {iln.gettext(
                  "Please allow up to 15 minutes for it to arrive in your inbox."
                )}
              </p>
              <FlexBox hAlign="flex-end">
                <Button onClick={() => modalActions.removeById(modalID)}>
                  {iln.gettext("OK")}
                </Button>
              </FlexBox>
            </div>
          ),
        }}
      </Switcher>
    </div>
  );
};

AddSendFromAddress.propTypes = {
  existingEmailAddresses: propTypes.arrayOf(propTypes.string).isRequired,
  modalID: propTypes.string.isRequired,
};

export default AddSendFromAddress;
