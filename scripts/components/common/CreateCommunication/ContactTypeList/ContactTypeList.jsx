import { Button } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./ContactTypeList.propTypes.js";
import useStyles from "./ContactTypeList.styles.js";

const ContactTypeList = ({ contactTypes, onContactTypeSelect }) => {
  const classes = useStyles();

  return (
    <ul className={classes.contactTypeList}>
      {contactTypes.map((contact) => (
        <li key={contact.id}>
          <Button onClick={() => onContactTypeSelect(contact)} type="text">
            {contact.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

ContactTypeList.propTypes = propTypes;

export default ContactTypeList;
