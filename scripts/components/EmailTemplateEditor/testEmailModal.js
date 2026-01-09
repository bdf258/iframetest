import {
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import {
  installationPreferences,
  userPreferences,
} from "../../helpers/localStorageHelper.js";

import api from "@electedtech/api";
import { createUseStyles } from "react-jss";
import isEmail from "../../helpers/isEmailRegex";
import propTypes from "prop-types";

function testEmailModal(templateId, templateName, setSendTest) {
  return {
    id: "sendTestEmailModal",
    title: "Send Test Email",
    component: (
      <TestEmail
        templateId={templateId}
        templateName={templateName}
        setSendTest={setSendTest}
      />
    ),
    blurBackground: true,
    lockWindow: true,
    allowClose: true,
  };
}

const useStyles = createUseStyles({
  note: {
    fontSize: 0.75 + "em",
    color: "#363636",
    marginLeft: 5,
    marginBottom: 15,
  },
  mergeCodeError: {
    "& div": {
      fontWeight: "bold",
    },
    "& li": {
      color: "red",
      "& span": {
        color: "black",
        fontSize: "0.9em",
      },
    },
  },
});

function TestEmail({ templateId, templateName, setSendTest }) {
  const [toEmail, setToEmail] = useState("");
  const [error, setError] = useState("");
  const { modalActions } = useContext(ModalContext);
  const classes = useStyles();
  function verifyMergeCodes() {
    return new Promise(function (resolve) {
      const getBody = api.getEmailBody(
        {
          id: templateId,
        },
        modalActions
      );

      getBody.then((body) =>
        api
          .checkEmailMergeCodes(
            {
              body: body.emailBody,
            },
            modalActions
          )
          .then((response) => {
            resolve(response);
          })
      );
    });
  }
  const sendTestEmail = async ($templateId) => {
    if (!isEmail.test(toEmail)) {
      setError("Please Enter a valid email address");
      return;
    }
    setError("");

    const res = await api.sendTestEmail(
      {
        id: $templateId,
        to: toEmail,
        from: userPreferences.altSendIsPrimary
          ? userPreferences.altSendEmailAs[0]
          : installationPreferences.defaultEmailAddress,
        // body: "test body",
        subject: `Email Template : ${templateName}`,
        testingEmailTemplate: true,
      },
      modalActions
    );
    if (res) {
      alert("Test Email Sent");
      setSendTest(false);
    }
  };
  useEffect(() => {
    const mergeCodeDiv = document.getElementById("mergeCodeMessage");
    verifyMergeCodes().then((result) => {
      if (result) {
        const message = result.message;
        const temp = document.createElement("div");
        temp.innerHTML = message;
        mergeCodeDiv.removeChild(document.getElementById("mergeCodeLoading"));
        mergeCodeDiv.appendChild(temp);
      } else {
        mergeCodeDiv.removeChild(document.getElementById("mergeCodeLoading"));
      }
    });
  }, []);

  return (
    <div>
      <FlexBox column>
        <div>
          Enter the email address you would like to send the test email to below
        </div>
        <br />
        <FormTextInput
          placeholder={"your@email.com"}
          label="Email Address"
          name="testEmailAddress"
          value={toEmail}
          error={error}
          onChange={(e) => setToEmail(e.target.value)}
        />

        <div id="mergeCodeMessage" className={classes.mergeCodeError}>
          <span id="mergeCodeLoading">
            Verifying MergeCodes .... <Spinner />
          </span>
        </div>
        <br />
        <div className={classes.note}>
          Note: 01/01/1990 will be used as date of birth for test emails.
        </div>
        <FlexBox hAlign="flex-end">
          <Button
            onClick={() => {
              sendTestEmail(templateId);
            }}
          >
            Send Test Email
          </Button>
        </FlexBox>
      </FlexBox>
    </div>
  );
}
TestEmail.propTypes = {
  setSendTest: propTypes.func,
  templateId: propTypes.string,
  templateName: propTypes.string,
};

export default testEmailModal;
