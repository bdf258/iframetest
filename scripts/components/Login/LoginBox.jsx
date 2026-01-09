import {
  FormHandler,
  FormPasswordInput,
  FormSubmitButton,
  FormTextInput,
  Link,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  getLanguage,
  removeItems,
  setItem,
} from "../../helpers/localStorageHelper";

import SSO from "./SSO";
import { TranslationContext } from "context/translate";
import hash from "md5";
import isEmail from "../../helpers/isEmailRegex";
import propTypes from "prop-types";
import { useStyles } from "./styles";

const login = async (
  form,
  setEmailError,
  setPasswordError,
  setSecondFactorError,
  setFetching,
  api,
  onSuccess,
  iln
) => {
  const { email, password } = form;
  const secondFactor = form.otp ? form.otp.replace(" ", "") : "";
  let error = false;

  // check email
  switch (true) {
    case email === undefined:
    case email === "":
      setEmailError(iln.gettext("Please enter your email address"));
      error = true;
      break;
    // email contains 1 "@" with 1 "." after with at least 1 characters between and 1 character after the "."
    case !isEmail.test(email):
      setEmailError(iln.gettext("Invalid email address"));
      break;
    default:
      setEmailError(null);
  }
  // check password
  switch (true) {
    case password === undefined:
    case password === "":
      error = true;
      setPasswordError(iln.gettext("Please enter your password"));
      break;
    default:
      setPasswordError(null);
  }
  // check secondFactor
  switch (true) {
    case secondFactor === undefined:
    case secondFactor === "":
      error = true;
      setSecondFactorError(
        iln.gettext("Enter your Google Authenticator code or use your Yubikey")
      );
      break;
    case secondFactor.length < 6:
      error = true;
      setSecondFactorError(iln.gettext("A GA code is at least 6 numbers"));
      break;
    case secondFactor.length != 6 && secondFactor.length !== 44:
      error = true;
      setSecondFactorError(iln.gettext("Invalid input, please try again"));
      break;
    default:
      setSecondFactorError(null);
  }

  if (!error) {
    setFetching(true);
    // hash the password so the backend never sees a plain text password.
    // will be further encrypted on the backend.
    const payload = {
      email,
      password: hash(form.password),
      secondFactor,
      locale: getLanguage(),
    };

    removeItems([
      "casetypes",
      "donationProducts",
      "membershipTypes",
      "donationTypes",
      "statustypes",
      "categorytypes",
      "donationMethods",
    ]);
    const response = await api
      .login(payload)
      .catch((e) => e.json())
      .finally(() => setFetching(false));

    if (response.reason) {
      // if reason key present then login failed
      switch (response.reason) {
        case "Your username and password don't match":
          setEmailError(iln.gettext("Your username and password don't match"));
          setPasswordError(" ");
          break;
        case "That isn't your Yubikey":
          setSecondFactorError(iln.gettext("That isn't your Yubikey"));
          break;
        case "That Authenticator code has already been used":
          setSecondFactorError("That Authenticator code has already been used");
          break;
        case "Your Google authenticator didn't authenticate":
          setSecondFactorError("Your Google authenticator didn't authenticate");
          break;
      }
    } else {
      Object.keys(response).forEach((key) => {
        setItem(key, response[key]);
      });
      onSuccess(response.userIdentity);
    }
  }
};

// api cannot be imported directly in this file as it is
// imported by api/handleError.js which creates an import loop
const LoginBox = ({ api, onSuccess }) => {
  const classes = useStyles();

  const iln = useContext(TranslationContext);

  const [fetching, setFetching] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [secondFactorError, setSecondFactorError] = useState(null);

  return (
    <>
      <FormHandler
        allowEnterKey
        autocomplete="off"
        onSubmit={(form) => {
          !fetching &&
            login(
              form,
              setEmailError,
              setPasswordError,
              setSecondFactorError,
              setFetching,
              api,
              onSuccess,
              iln
            );
        }}
      >
        <p>{iln.gettext("You must be logged in to continue")}</p>
        <FormTextInput
          name="email"
          label="Email"
          error={emailError}
          customClassNames={{
            container: classes.textInputContainer,
            input: classes.textInputInput,
          }}
        />
        <FormPasswordInput
          name="password"
          label={iln.gettext("Password")}
          error={passwordError}
          customClassNames={{
            container: classes.textInputContainer,
            input: classes.textInputInput,
          }}
        />
        <FormTextInput
          name="otp"
          label={iln.gettext("Yubikey / GA")}
          error={secondFactorError}
          customClassNames={{
            container: classes.textInputContainer,
            input: classes.textInputInput,
          }}
          autoComplete="one-time-code"
        />
        <div className={classes.buttonContainer}>
          <FormSubmitButton type="submit" disabled={fetching}>
            {fetching ? (
              <Spinner customClassNames={{ container: classes.spinner }} />
            ) : (
              iln.gettext("Login")
            )}
          </FormSubmitButton>
          <div className={classes.forgotPasswordContainer}>
            <Link underline href="forgottenpassword.php">
              {iln.gettext("I've forgotten my password")}
            </Link>
          </div>
        </div>
      </FormHandler>
      <SSO api={api} onSuccess={onSuccess} />
    </>
  );
};

LoginBox.propTypes = {
  api: propTypes.exact({
    login: propTypes.func.isRequired,
    sso: propTypes.func.isRequired,
  }).isRequired,
  onSuccess: propTypes.func.isRequired,
};

export default LoginBox;
