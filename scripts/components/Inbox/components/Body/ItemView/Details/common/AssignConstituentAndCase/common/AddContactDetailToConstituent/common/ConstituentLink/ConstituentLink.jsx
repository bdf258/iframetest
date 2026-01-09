import React from "react";
import propTypes from "./ConstituentLink.propTypes.js";

const ConstituentLink = ({ constituent }) => {
  return (
    <a
      href={`/viewconstituent.php?constituentID=${constituent.id}`}
      target="_blank"
      rel="noreferrer"
    >
      {`${constituent.title || ""} ${constituent.firstName || ""} ${
        constituent.surname || ""
      }`.trim()}
    </a>
  );
};

ConstituentLink.propTypes = propTypes;

export default ConstituentLink;
