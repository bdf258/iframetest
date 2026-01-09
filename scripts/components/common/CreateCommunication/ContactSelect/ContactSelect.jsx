import {
  constituentTypeID,
  organisationTypeID,
} from "../consts/contactTypeIDs";
import { AutoComplete } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./ContactSelect.propTypes.js";
import useStyles from "./ContactSelect.styles.js";

const ContactSelect = ({
  contactTypeId,
  question,
  onContactSelect,
  dataSource,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contactSelect}>
      <p>{question}</p>
      <AutoComplete
        typingTimeoutDelay={500}
        disableResultSort
        clearInputOnFocus
        showAllResultsOnFocus={
          contactTypeId === constituentTypeID ||
          contactTypeId === organisationTypeID
        }
        name="contactSelect"
        dataSource={dataSource}
        onResultClick={onContactSelect}
      />
    </div>
  );
};

ContactSelect.propTypes = propTypes;

export default ContactSelect;
