import React, { useContext } from "react";

import AssignActions from "../../common/AssignActions/AssignActions.jsx";
import Hr from "../../../../../../../../../common/Hr";
import SelectConstituent from "../../../SelectConstituent/SelectConstituent.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import theme from "@electedtech/theme";
import { useStyles } from "../../AssignConstituentAndCase.styles.js";

const MatchingNames = ({
  matchingConstituents,
  onConstituentSelect,
  electoralRollMatches,
  onClickCreateConstituent,
  onElectoralRollSelect,
  onClickCreateOrganisation,
  onClickSearchAllConstituents,
  inboxItemType,
}) => {
  const iln = useContext(TranslationContext);

  const classes = useStyles(theme);

  return (
    <div>
      <p className={classes.centerText}>
        {iln.gettext("There are no constituents that match this")}{" "}
        {["sms-inbound", "whatsapp-inbound"].includes(inboxItemType)
          ? iln.gettext("phone number")
          : iln.gettext("email address")}
        {", "}
        {iln.gettext("however the following constituents have matching names")}
      </p>
      <SelectConstituent
        onCreateNewConstituent={onClickCreateConstituent}
        onCreateNewOrganisation={onClickCreateOrganisation}
        name="matchingConstituents"
        onConstituentSelect={onConstituentSelect}
        onElectoralRollSelect={onElectoralRollSelect}
        matchingConstituents={matchingConstituents}
        electoralRollMatches={electoralRollMatches}
      />
      <Hr margin={8}>{iln.gettext("Or")}</Hr>
      <AssignActions
        onClickCreateConstituent={onClickCreateConstituent}
        onClickCreateOrganisation={onClickCreateOrganisation}
        onClickSearchAllConstituents={onClickSearchAllConstituents}
      />
    </div>
  );
};

MatchingNames.propTypes = propTypes;

export default MatchingNames;
