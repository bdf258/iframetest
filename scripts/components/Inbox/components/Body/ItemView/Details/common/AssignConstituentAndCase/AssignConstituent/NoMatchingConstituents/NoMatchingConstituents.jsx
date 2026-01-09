import { Button, ButtonBar } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ConstituentAndCaseSearch from "../../../../../../common/components/ConstituentAndCaseSearch/ConstituentAndCaseSearch.jsx";
import Hr from "../../../../../../../../../common/Hr";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import theme from "@electedtech/theme";
import { useStyles } from "../../AssignConstituentAndCase.styles.js";

const NoMatchingConstituents = ({
  onConstituentSelect,
  onCaseSelect,
  onElectoralRollSelect,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  inboxItemType,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles(theme);

  return (
    <React.Fragment>
      <p className={classes.centerText}>
        {iln.gettext("There are no constituents that match this")}{" "}
        {["sms-inbound", "whatsapp-inbound"].includes(inboxItemType)
          ? iln.gettext("phone number")
          : iln.gettext("email address")}
        {". "}
        {iln.gettext(
          "Search for a constituent, organisation or case reference below"
        )}
      </p>
      <ConstituentAndCaseSearch
        onConstituentSelect={onConstituentSelect}
        onCaseSelect={onCaseSelect}
        onElectoralRollSelect={onElectoralRollSelect}
      />
      <Hr margin={8}>{iln.gettext("Or")}</Hr>
      <div className={classes.centerText}>
        <ButtonBar>
          <Button
            customClassNames={classes.textButton}
            onClick={onClickCreateConstituent}
          >
            {iln.gettext("Create new constituent")}
          </Button>
          <Button
            customClassNames={classes.textButton}
            onClick={onClickCreateOrganisation}
          >
            {iln.gettext("Create new organisation")}
          </Button>
        </ButtonBar>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

NoMatchingConstituents.propTypes = propTypes;

export default NoMatchingConstituents;
