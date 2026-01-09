import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import ConstituentAndCaseSearch from "../../../../../../../../common/components/ConstituentAndCaseSearch/ConstituentAndCaseSearch.jsx";
import TranslationContext from "../../../../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import { useStyles } from "./styles.js";

const SearchConstituents = ({ onCancelClick, onConstituentSelect }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div>
      <h3>{iln.gettext("Search Constituent")}</h3>
      <p>
        {iln.gettext(
          "Search for a constituent or organisation in your existing database by entering their details below"
        )}
      </p>
      <ConstituentAndCaseSearch onConstituentSelect={onConstituentSelect} />
      <br />
      <div className={classes.center}>
        <Button onClick={onCancelClick}>{iln.gettext("Cancel Search")}</Button>
      </div>
    </div>
  );
};

SearchConstituents.propTypes = propTypes;

export default SearchConstituents;
