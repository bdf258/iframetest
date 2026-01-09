import { Placeholder, Switcher } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CreateConstituent from "../../../../../../../../../../common/CreateConstituent/CreateConstituent.jsx";
import CreateConstituentOrOrg from "../../../../../common/AssignConstituentAndCase/CreateConstituentOrOrg";
import CreateOrganisation from "../../../../../../../../../../common/CreateOrganisation";
import MatchesAndActions from "./MatchesAndActions/MatchesAndActions.jsx";
import SearchConstituents from "./SearchConstituents/SearchConstituents.jsx";
import TranslationContext from "../../../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import getNameAndAddressFromEmail from "../../../../../../../../../helpers/getNameAndAddressFromEmail.js";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./ConstituentSelect.redux";
import { useStyles } from "./styles.js";

const destructureConstituent = ({
  id,
  organisation,
  title,
  firstName,
  surname,
  address1,
  address2,
  town,
  county,
  postcode,
  registeredAddress1,
  registeredAddress2,
  registeredTown,
  registeredState,
  registeredPostcode,
  email,
  mobile,
  telephone,
}) => ({
  id,
  title,
  organisation,
  firstName,
  surname,
  address1,
  address2,
  town,
  county,
  postcode,
  registeredAddress1,
  registeredAddress2,
  registeredTown,
  registeredState,
  registeredPostcode,
  email,
  mobile,
  telephone,
});

export const addEmailIfNotExists = (emailToCheck, constituent) => {
  if (!emailToCheck || typeof emailToCheck !== "string") return constituent;
  if (!constituent || !constituent?.email || !Array.isArray(constituent.email))
    return constituent;

  const alreadyHasEmail = constituent.email.some(
    ({ value = "" }) =>
      value.trim().toLowerCase() === emailToCheck.trim().toLowerCase()
  );

  if (!alreadyHasEmail)
    return {
      ...constituent,
      email: [
        ...constituent.email,
        {
          id: `temp-${emailToCheck}`,
          value: emailToCheck,
          primary: constituent.email.length === 0,
        },
      ],
    };

  return constituent;
};

const ConstituentSelect = ({
  constituentMatches,
  electoralRollMatches,
  resultType,
  fetching,
  view,
  setView,
  email,
  onConstituentSelect,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [confirmDetails, setConfirmDetails] = useState();
  const { organisationTypes, addOrganisationType, connectionTypes, roleTypes } =
    useReduxSlice();

  const isSMS = ["sms-inbound", "whatsapp-inbound"].includes(
    email.type.toLowerCase()
  );
  const {
    firstName = "",
    surname = "",
    email: fromEmailAddress = "",
  } = getNameAndAddressFromEmail(email?.from, email?.to);

  if (confirmDetails)
    if (confirmDetails.isOrganisation)
      return (
        <div className={classes.confirmDetails}>
          <h3>{iln.gettext("Confirm Details")}</h3>
          <CreateOrganisation
            inititalValues={confirmDetails}
            onCreateOrganisation={(updatedOrganisation) => {
              addOrganisationType(updatedOrganisation.organisationType);

              if (
                JSON.stringify(destructureConstituent(confirmDetails)) ===
                JSON.stringify(destructureConstituent(updatedOrganisation))
              ) {
                setConfirmDetails(undefined);
                onConstituentSelect(updatedOrganisation?.id);
              } else {
                api.updateConstituent(updatedOrganisation).then(() => {
                  setConfirmDetails(undefined);
                  onConstituentSelect(updatedOrganisation?.id);
                });
              }
            }}
            onCancelClick={() => {
              setView("suggestions");
              setConfirmDetails(undefined);
            }}
            organisationTypes={organisationTypes}
            connectionTypes={connectionTypes}
            roleTypes={roleTypes}
            createButtonText={iln.gettext("Update")}
          />
        </div>
      );
    else
      return (
        <div className={classes.confirmDetails}>
          <h3>{iln.gettext("Confirm Details")}</h3>
          <CreateConstituent
            inititalValues={confirmDetails}
            onCreateClick={(updatedConstituent) => {
              if (
                JSON.stringify(destructureConstituent(confirmDetails)) ===
                JSON.stringify(destructureConstituent(updatedConstituent))
              ) {
                setConfirmDetails(undefined);
                onConstituentSelect(updatedConstituent?.id);
              } else {
                api.updateConstituent(updatedConstituent).then(() => {
                  setConfirmDetails(undefined);
                  onConstituentSelect(updatedConstituent?.id);
                });
              }
            }}
            cancelButtonText={iln.gettext("Back")}
            onCancelClick={() => {
              setView("suggestions");
              setConfirmDetails(undefined);
            }}
            createButtonText={iln.gettext("Update")}
          />
        </div>
      );

  return (
    <div className={classes.constituentSelect}>
      <Switcher selected={view}>
        {{
          suggestions: (
            <React.Fragment>
              <h3>{iln.gettext("Match to Constituent")}</h3>
              {fetching ? (
                <div className={classes.cardContainer}>
                  <Placeholder width={"100%"} height={100} />
                  {Array(Math.floor(1 + Math.random() * 5))
                    .fill()
                    .map((_, idx) => (
                      <Placeholder
                        key={idx}
                        width={200}
                        height={100}
                        className={classes.placeholder}
                      />
                    ))}
                </div>
              ) : (
                <React.Fragment>
                  <MatchesAndActions
                    constituentMatches={constituentMatches}
                    electoralRollMatches={electoralRollMatches}
                    resultType={resultType}
                    setView={setView}
                    setConfirmDetails={setConfirmDetails}
                    fromEmailAddress={fromEmailAddress}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          ),
          search: (
            <SearchConstituents
              onCancelClick={() => setView("suggestions")}
              onConstituentSelect={(selectedConstituent) => {
                setConfirmDetails(
                  addEmailIfNotExists(fromEmailAddress, selectedConstituent)
                );
                setView("suggestions");
              }}
            />
          ),
          createConstituent: (
            <React.Fragment>
              <h3>{iln.gettext("Create Constituent")}</h3>
              <CreateConstituentOrOrg
                createAsOrg={false}
                inititalValues={{
                  firstName,
                  surname,
                  email: isSMS
                    ? []
                    : [
                        {
                          id: "temp-0",
                          value: fromEmailAddress,
                          primary: true,
                        },
                      ],
                  mobile: isSMS
                    ? [{ id: "temp-0", value: fromEmailAddress, primary: true }]
                    : [],
                }}
                onClickBack={() => {
                  setView("suggestions");
                }}
                onClickNext={(details, newConstituentID) => {
                  onConstituentSelect(newConstituentID);
                }}
              />
            </React.Fragment>
          ),
          createOrganisation: (
            <React.Fragment>
              <h3>{iln.gettext("Create Organisation")}</h3>
              <CreateConstituentOrOrg
                createAsOrg={true}
                inititalValues={{
                  firstName,
                  surname,
                  email: isSMS
                    ? []
                    : [
                        {
                          id: "temp-0",
                          value: fromEmailAddress,
                          primary: true,
                        },
                      ],
                  mobile: isSMS
                    ? [{ id: "temp-0", value: fromEmailAddress, primary: true }]
                    : [],
                }}
                onClickBack={() => {
                  setView("suggestions");
                }}
                onClickNext={(details, newConstituentID) => {
                  onConstituentSelect(newConstituentID);
                }}
              />
            </React.Fragment>
          ),
        }}
      </Switcher>
    </div>
  );
};

ConstituentSelect.propTypes = propTypes;

export default ConstituentSelect;
