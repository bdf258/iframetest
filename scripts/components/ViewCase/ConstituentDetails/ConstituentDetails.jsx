import { Link, List } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  formatEmailAddressesForDisplay,
  formatMobileNumbersForDisplay,
  formatTelephoneNumbersForDisplay,
} from "./helpers/formatContactDetailsForDisplay";

import DeceasedBanner from "./DeceasedBanner/DeceasedBanner.jsx";
import DoNotContactBanner from "./DoNotContactBanner/DoNotContactBanner.jsx";
import Placeholder from "./Placeholder.jsx";
import { TranslationContext } from "context/translate";
import getAddress from "./helpers/getAddress.js";
import getConstituentDisplayName from "../../../helpers/getConstituentDisplayName.js";
import { useReduxSlice } from "./ConstituentDetails.redux";
import { useStyles } from "./styles";

const ConstituentDetails = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { constituent, doNotContactTypes } = useReduxSlice();

  if (!constituent || !doNotContactTypes) return <Placeholder />;

  const { telephone, mobile, email } = constituent;

  return (
    <React.Fragment>
      <DeceasedBanner isDeceased={constituent?.deceased} />
      <DoNotContactBanner
        selectedDoNotContacts={(constituent?.doNotContact || []).map(
          ({ doNotContactType }) => doNotContactType
        )}
        doNotContactTypes={doNotContactTypes}
      />
      <List
        bulletPoints={false}
        indent={false}
        className={classes.constituentDetails}
      >
        <ul>
          <li>
            <Link
              underline
              type="text"
              href={`/viewconstituent.php?constituentID=${constituent.id}`}
            >
              <h2>{getConstituentDisplayName(constituent)}</h2>
            </Link>
          </li>
          <li>
            {getAddress(constituent) || iln.gettext("No address on file")}
          </li>
          <li>{formatEmailAddressesForDisplay(email)}</li>
          <li>{formatMobileNumbersForDisplay(mobile)}</li>
          <li>{formatTelephoneNumbersForDisplay(telephone)}</li>
        </ul>
      </List>
    </React.Fragment>
  );
};

export default ConstituentDetails;
