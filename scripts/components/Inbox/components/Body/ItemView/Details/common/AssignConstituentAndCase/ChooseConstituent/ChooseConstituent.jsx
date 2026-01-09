import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import ConstituentAndCaseSearch from "../../../../../common/components/ConstituentAndCaseSearch/ConstituentAndCaseSearch.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import { useStyles } from "./styles.js";

const ChooseConstituent = ({
  onClickBack,
  onConstituentSelect,
  onClickCreateConstituent,
  onElectoralRollSelect,
  onCaseSelect,
  onClickCreateOrganisation,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      <div className={classes.textSpacing}>
        {iln.gettext(
          "Search for a constituent, organisation or case reference below or"
        )}{" "}
        <button
          onClick={onClickCreateConstituent}
          className={classes.textButton}
        >
          {iln.gettext("create a constituent")}
        </button>{" "}
        {iln.gettext("or")}{" "}
        <button
          onClick={onClickCreateOrganisation}
          className={classes.textButton}
        >
          {iln.gettext("create new organisation")}
        </button>
      </div>
      <ConstituentAndCaseSearch
        onConstituentSelect={onConstituentSelect}
        onCaseSelect={onCaseSelect}
        onElectoralRollSelect={onElectoralRollSelect}
      />
      <div className={classes.backButtonContainer}>
        <Button onClick={onClickBack}>{iln.gettext("Back")}</Button>
      </div>
    </React.Fragment>
  );
};

ChooseConstituent.propTypes = propTypes;

export default ChooseConstituent;
