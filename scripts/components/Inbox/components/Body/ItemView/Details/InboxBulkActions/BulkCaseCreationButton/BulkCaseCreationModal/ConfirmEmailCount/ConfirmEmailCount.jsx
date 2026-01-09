import { Button, NotificationBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const ConfirmEmailCount = ({ onBackClick, onConfirmClick, numberOfEmails }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.container}>
      <NotificationBox
        type="warn"
        alertMessage={iln.gettext(
          "Are you sure you want to process %1 selected emails?",
          numberOfEmails
        )}
      />
      <p>{iln.gettext("Please note: This cannot be undone.")}</p>
      <p>
        {iln.gettext(
          "Any emails that are already assigned have been excluded and all emails that do not currently have a case will be marked as actioned on completion."
        )}
      </p>
      <div className={classes.buttons}>
        <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
        <Button isDisabled={numberOfEmails <= 0} onClick={onConfirmClick}>
          {iln.gettext("Confirm")}
        </Button>
      </div>
    </div>
  );
};

ConfirmEmailCount.propTypes = propTypes;

export default ConfirmEmailCount;
