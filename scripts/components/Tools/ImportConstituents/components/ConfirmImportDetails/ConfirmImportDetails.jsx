import { Button, FlexBox, NotificationBox } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import { TranslationContext } from "context/translate";
import { allowPersonalFlags } from "../../../../../consts/disabledFeatures.js";
import propTypes from "./ConfirmImportDetails.propTypes.js";

let countdownTimeout;

const ConfirmImportDetails = ({
  noOfConstituents = 0,
  addReviewFlag,
  onConfirm,
  onBack,
  createCases,
  keepExistingContactDetails,
}) => {
  const iln = useContext(TranslationContext);

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0)
      countdownTimeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1 * 1000);

    return () => clearTimeout(countdownTimeout);
  }, [countdown]);

  return (
    <React.Fragment>
      <NotificationBox
        type="warn"
        alertMessage={iln.gettext(
          "Please confirm the details below, the import process cannot be undone."
        )}
      />
      <p>
        {iln.ngettext(
          "%1 row of a single constituent is being imported",
          "%1 rows of constituents are being imported",
          noOfConstituents
        )}
      </p>

      {allowPersonalFlags && (
        <p>
          {!addReviewFlag
            ? iln.gettext("No 'For Review' flag will be assigned")
            : iln.gettext(
                "A 'For Review' Flag will be assigned to imported contstituents"
              )}
        </p>
      )}
      {keepExistingContactDetails
        ? iln.gettext(
            "Matches will retain their exiting details as their primary contact details"
          )
        : iln.gettext(
            "Matches will have their primary contact details updated with the imported details"
          )}
      <p>
        {createCases
          ? iln.gettext("A case will be assigned to each imported constituent")
          : iln.gettext("No cases will be assigned")}
      </p>
      <h3>Matching Criteria</h3>
      <p>
        Given data would be matched on following criteria, and in this order
      </p>
      <ul>
        <li>Firstname, surname, email</li>
        <li>Firstname, surname, mobile</li>
        <li>Firstname, surname, telephone</li>
        <li>Firstname, surname, date of birth</li>
        <li>Firstname, surname, Postcode</li>
        <li>Firstname, surname, Address1</li>
        <li>Firstname, email</li>
      </ul>
      <p>
        If a single match is not found or if there is no given value for any
        field in the first criteria it will move to the next one and so on
        untill a single match is found. <br /> If no single match is found a new
        constituent will be created with given details.
      </p>
      <FlexBox hAlign="space-between">
        <Button onClick={onBack}>{iln.gettext("Back")}</Button>
        <Button isDisabled={countdown !== 0} onClick={onConfirm}>
          {countdown === 0 ? iln.gettext("Confirm") : countdown}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

ConfirmImportDetails.propTypes = propTypes;

export default ConfirmImportDetails;
