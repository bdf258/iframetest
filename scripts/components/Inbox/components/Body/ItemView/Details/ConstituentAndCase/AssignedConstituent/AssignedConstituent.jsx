import React, { useContext } from "react";

import AssignedConstituentPlaceholder from "./AssignedConstituentPlaceholder.jsx";
import { TranslationContext } from "context/translate";
import { noPermissionConstituentID } from "../../consts/noPermissionConstituent.js";
import proptypes from "./propTypes.js";
import { useStyles } from "./AssignedConstituent.styles.js";

const AssignedConstituent = ({ constituent }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  if (!constituent) return <AssignedConstituentPlaceholder />;

  if (constituent.id === noPermissionConstituentID)
    return (
      <span className={classes.lackPermissions}>
        {iln.gettext("Unknown (due to case permissions)")}
      </span>
    );

  return (
    <a
      className={classes.constituent}
      href={`/viewconstituent.php?constituentID=${constituent.id}`}
    >
      {constituent?.isOrganisation
        ? `${constituent.organisation} - ${constituent.address1} ${constituent.town}`
        : `${constituent.title} ${
            constituent?.knownAs
              ? constituent.firstName
                ? `${constituent.knownAs} (${constituent.firstName})`
                : `${constituent.knownAs}`
              : constituent.firstName
                ? `${constituent.firstName}`
                : ""
          } ${constituent.surname} - ${constituent.address1} ${constituent.town}`}
    </a>
  );
};

AssignedConstituent.propTypes = proptypes;

export default AssignedConstituent;
