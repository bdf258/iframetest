import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./ScheduledDatePastConfirmation.propTypes.js";
import useStyles from "./ScheduledDatePastConfirmation.styles.js";

const ScheduledDatePastConfirmation = ({ onConfirm, onCancel }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.scheduledDatePastConfirmation}>
      <p>{iln.gettext("The scheduled time and date has past.")}</p>
      <p>{iln.gettext("Would you like to send your bulk email now?")}</p>
      <FlexBox hAlign="space-between">
        <Button size="small" onClick={onCancel}>
          {iln.gettext("Back to Email Editor")}
        </Button>
        <Button size="small" onClick={onConfirm}>
          {iln.gettext("Send Now")}
        </Button>
      </FlexBox>
    </div>
  );
};

ScheduledDatePastConfirmation.propTypes = propTypes;

export default ScheduledDatePastConfirmation;
