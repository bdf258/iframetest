import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import localStore, {
  getUserPreferences,
} from "../../helpers/localStorageHelper";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { createUseStyles } from "react-jss";
import { getQueryStringParamMap } from "../../helpers/queryString";

const useStyles = createUseStyles({
  page: { width: 500 },
});

const getMessage = ({ status, iln }) =>
  ({
    success: iln.gettext(
      "Successfully validated, you can now send on behalf of this email address."
    ),
    failed: iln.gettext(
      "Failed to validated email address, check the link and try again."
    ),
    invalid: iln.gettext("Invalid validation URL."),
  }[status]);

const updateLocalStorage = (email) => {
  if(!email) return;
  const userPreferences = getUserPreferences() || { altSendEmailAs: [] };
  localStore.setItem("userPreferences", {
    ...userPreferences,
    altSendEmailAs: userPreferences.altSendEmailAs?.length > 0
      ? [...userPreferences.altSendEmailAs, email]
      : [email],
  });
};

const ValidatePage = () => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const [status, setStatus] = useState();

  useEffect(() => {
    const uuid = getQueryStringParamMap().get("uuid");

    if (typeof uuid === "string") {
      api
        .validateSendFromAddress(uuid, modalActions, iln)
        .then(({ success, email }) => {
          updateLocalStorage(email);
          if (email) {
            setStatus("success");
          } else if (success) {
            setStatus("success");
          } else {
            setStatus("failed");
          }
        })
        .catch(() => setStatus("failed"));
    } else {
      setStatus("invalid");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexBox hAlign="center">
      <div className={classes.page}>
        <div></div>
        <h1>{iln.gettext("Validate Send From Address")}</h1>
        <p>{getMessage({ status, iln })}</p>
        <FlexBox hAlign="flex-end">
          <Button onClick={() => window.location.replace("/index.php")}>
            {iln.gettext("OK")}
          </Button>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default ValidatePage;
