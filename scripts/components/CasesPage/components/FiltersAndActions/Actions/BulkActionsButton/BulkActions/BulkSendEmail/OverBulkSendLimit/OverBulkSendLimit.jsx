import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import { installationPreferences } from "@electedtech/helpers/localStorageHelper";
import propTypes from "./OverBulkSendLimit.propTypes";
import { useStyles } from "./OverBulkSendLimit.styles";
import { useTheme } from "react-jss";

const OverBulkSendLimit = ({ recipientCount }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  return (
    <div className={classes.innerModalContainer}>
      <p>
        {iln.gettext(
          `The bulk email send limit is set at ${installationPreferences.bulkSendLimit.toLocaleString()} emails per bulk send.`
        )}{" "}
        {iln.gettext(
          `You are trying to send a bulk email to ${recipientCount.toLocaleString()} recipients.`
        )}
      </p>
      <p>
        {iln.gettext(
          "To send an email reduce the number of recipients below the limit."
        )}
      </p>
      <FlexBox hAlign={"center"}>
        <Button onClick={() => modalActions.reset()}>
          {iln.gettext("Done")}
        </Button>
      </FlexBox>
    </div>
  );
};

OverBulkSendLimit.propTypes = propTypes;

export default OverBulkSendLimit;
