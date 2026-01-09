import {
  Button,
  FlexBox,
  FormTextInput,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import propTypes from "./SendTestEmail.propTypes.js";
import singleEmailRegex from "../../../../../../../../../helpers/isEmailRegex.js";
import useStyles from "./SendTestEmail.styles.js";
import { useTheme } from "react-jss";
import { userIdentity } from "../../../../../../../../../helpers/localStorageHelper.js";

const userEmailAddress = userIdentity.email || "";

const SendTestEmail = ({ setView, email }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);

  const [testEmailAddress, setTestEmailAddress] = useState(userEmailAddress);
  const [fetching, setFetching] = useState();

  return (
    <React.Fragment>
      <div className={classes.spacing}>
        {iln.gettext(
          "Enter the email address you would like to send the test email to below"
        )}
      </div>
      <FormTextInput
        name="testEmailAddress"
        label="Email Address"
        onChange={({ target: { value } }) => setTestEmailAddress(value)}
        value={testEmailAddress}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.spacing }}
      />
      <div className={classes.spacing}>
        {iln.gettext(
          "Note: 01/01/1990 will be used as date of birth for test emails"
        )}
      </div>
      <FlexBox hAlign="space-between">
        <Button onClick={() => setView("writeEmail")}>
          {iln.gettext("Back")}
        </Button>
        <Button
          customClassNames={classes.button}
          isDisabled={!singleEmailRegex.test(testEmailAddress)}
          onClick={() => {
            setFetching(true);
            api
              .sendTestEmail({ ...email, to: testEmailAddress })
              .then(() => {
                setView("writeEmail");
              })
              .finally(() => setFetching(false));
          }}
        >
          {!fetching ? iln.gettext("Send Test Email") : <Spinner />}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

SendTestEmail.propTypes = propTypes;

export default SendTestEmail;
