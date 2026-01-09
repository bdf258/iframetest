import React, { useContext } from "react";

import AssignActions from "../../common/AssignActions/AssignActions.jsx";
import Hr from "../../../../../../../../../common/Hr";
import SelectConstituent from "../../../SelectConstituent/SelectConstituent.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import propTypes from "./propTypes.js";
import theme from "@electedtech/theme";
import { useStyles } from "../../AssignConstituentAndCase.styles.js";

const MultipleMatches = ({
  matchingConstituents,
  onConstituentSelect,
  onClickCreateConstituent,
  onClickCreateOrganisation,
  onClickSearchAllConstituents,
  inboxItemType,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles(theme);

  return (
    <React.Fragment>
      <p className={classes.centerText}>
        {iln.gettext("There are multiple entries that match the")}{" "}
        {["sms-inbound", "whatsapp-inbound"].includes(inboxItemType)
          ? iln.gettext("phone number")
          : iln.gettext("email address")}
        {", "}
        {iln.gettext("please select from below")}
      </p>
      <SelectConstituent
        onCreateNewConstituent={onClickCreateConstituent}
        onCreateNewOrganisation={onClickCreateOrganisation}
        onConstituentSelect={onConstituentSelect}
        matchingConstituents={matchingConstituents}
        name={"matchingConstituents"}
        keepErrorSpacing={false}
      />
      <Hr margin={8}>{iln.gettext("Or")}</Hr>
      <AssignActions
        onClickCreateConstituent={onClickCreateConstituent}
        onClickCreateOrganisation={onClickCreateOrganisation}
        onClickSearchAllConstituents={onClickSearchAllConstituents}
      />
    </React.Fragment>
  );
};

MultipleMatches.propTypes = propTypes;

export default MultipleMatches;
