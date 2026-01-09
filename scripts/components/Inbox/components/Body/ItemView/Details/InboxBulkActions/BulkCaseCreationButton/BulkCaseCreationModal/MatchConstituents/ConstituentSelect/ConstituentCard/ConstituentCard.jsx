import { Card } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const ConstituentCard = ({ details, onClick }) => {
  const classes = useStyles();

  const {
    isOrganisation,
    organisation,
    title,
    firstName,
    firstname,
    surname,
    address1,
    town,
    county,
    postcode,
  } = details;

  const hasNameAndAddress =
    (title || firstName || firstname || surname) &&
    (address1 || town || county || postcode);

  return (
    <button className={classes.buttonReset} onClick={() => onClick(details)}>
      <Card className={classes.constituentCard}>
        {isOrganisation
          ? [organisation]
          : [title, firstName || firstname, surname]
              .filter((x = "") => x.trim())
              .join(" ")}
        {hasNameAndAddress && (
          <React.Fragment>
            <br />
            <br />
          </React.Fragment>
        )}
        {[address1, town, county, postcode]
          .filter((x = "") => x.trim())
          .join(" ")}
      </Card>
    </button>
  );
};

ConstituentCard.propTypes = propTypes;

export default ConstituentCard;
