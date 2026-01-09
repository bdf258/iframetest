import { Button, ButtonBar } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ConstituentCard from "../ConstituentCard/ConstituentCard.jsx";
import Hr from "../../../../../../../../../../../common/Hr/index.js";
import TranslationContext from "../../../../../../../../../../../../context/translation/TranslationContext.js";
import { addEmailIfNotExists } from "../ConstituentSelect.jsx";
import propTypes from "./propTypes.js";
import { useStyles } from "./styles.js";

// "The from name for this email has more than one match in your constituents database and your electoral roll."

const MatchesAndActions = ({
  constituentMatches,
  electoralRollMatches,
  resultType,
  setView,
  setConfirmDetails,
  fromEmailAddress,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const numOfConstMatches = constituentMatches.length;
  const numOfRollMatches = electoralRollMatches.length;

  return resultType === "noMatches" ? (
    // No matches
    <React.Fragment>
      <p>
        {iln.gettext(
          "The from address and name for this email have no matches in your constituents database or your electoral roll."
        )}
      </p>
      <Hr>{iln.gettext("Or")}</Hr>
      <div className={classes.center}>
        <ButtonBar>
          <Button onClick={() => setView("search")}>
            {iln.gettext("Search for a constituent or organisation")}
          </Button>
        </ButtonBar>

        <ButtonBar>
          <Button onClick={() => setView("createConstituent")}>
            {iln.gettext("Create new constituent")}
          </Button>
          <Button onClick={() => setView("createOrganisation")}>
            {iln.gettext("Create new organisation")}
          </Button>
        </ButtonBar>
      </div>
    </React.Fragment>
  ) : resultType === "multipleMatches" ? (
    // Multiple email matches
    <React.Fragment>
      <p>
        {iln.gettext(
          "The from address for this email has more than one match in your constituents database."
        )}
      </p>
      <p>{iln.gettext("Please match it to the correct constituent below")} </p>
      {constituentMatches.length > 0 && (
        <React.Fragment>
          <h3>{iln.gettext("Constituent / Organisation matches")}</h3>
          <div className={classes.cardContainer}>
            {constituentMatches.map((option, idx) => (
              <ConstituentCard
                key={idx}
                details={option}
                onClick={(selectedConstituent) => {
                  setConfirmDetails(
                    addEmailIfNotExists(fromEmailAddress, selectedConstituent)
                  );
                }}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      {electoralRollMatches.length > 0 && (
        <React.Fragment>
          <h3>{iln.gettext("Roll matches")}</h3>
          <div className={classes.cardContainer}>
            {electoralRollMatches.map((option, idx) => (
              <ConstituentCard
                key={idx}
                details={option}
                onClick={(selectedConstituent) => {
                  setConfirmDetails(
                    addEmailIfNotExists(fromEmailAddress, selectedConstituent)
                  );
                  setView("create");
                }}
              />
            ))}
          </div>
        </React.Fragment>
      )}
      <Hr>{iln.gettext("Or")}</Hr>
      <div className={classes.center}>
        <ButtonBar>
          <Button onClick={() => setView("search")}>
            {iln.gettext("Search for a different constituent or organisation")}
          </Button>
        </ButtonBar>

        <ButtonBar>
          <Button onClick={() => setView("createConstituent")}>
            {iln.gettext("Create new constituent")}
          </Button>
          <Button onClick={() => setView("createOrganisation")}>
            {iln.gettext("Create new organisation")}
          </Button>
        </ButtonBar>
      </div>
    </React.Fragment>
  ) : resultType === "matchingNames" ? (
    <React.Fragment>
      <p>
        {numOfConstMatches > 0 && numOfRollMatches > 0
          ? iln.gettext(
              "The from name for this email has more than one match in your constituents database and electoral roll."
            )
          : numOfRollMatches > 0
          ? iln.ngettext(
              "The from name for this email has one match in your electoral roll.",
              "The from name for this email has more than one match in your electoral roll.",
              numOfRollMatches
            )
          : numOfConstMatches > 0
          ? iln.ngettext(
              "The from name for this email has one match in your constituents database.",
              "The from name for this email has more than one match in your constituents database.",
              numOfConstMatches
            )
          : iln.gettext(
              "There has been an issue, this message shouldn't appear."
            )}
      </p>
      <p>
        {numOfConstMatches > 0 && numOfRollMatches > 0
          ? iln.gettext(
              "Please select match it to the correct constituent or roll match below"
            )
          : numOfRollMatches > 0
          ? iln.gettext("Please select an electoral roll match below")
          : numOfConstMatches > 0
          ? iln.gettext("Please match it to the correct constituent below")
          : iln.gettext(
              "There has been an issue, this message shouldn't appear."
            )}
        {constituentMatches.length > 0 && (
          <React.Fragment>
            <h3>{iln.gettext("Constituent matches")}</h3>
            <div className={classes.cardContainer}>
              {constituentMatches.map((option, idx) => (
                <ConstituentCard
                  key={idx}
                  details={option}
                  onClick={(selectedConstituent) => {
                    setConfirmDetails(
                      addEmailIfNotExists(fromEmailAddress, selectedConstituent)
                    );
                  }}
                />
              ))}
            </div>
          </React.Fragment>
        )}
        {electoralRollMatches.length > 0 && (
          <React.Fragment>
            <h3>{iln.gettext("Roll matches")}</h3>
            <div className={classes.cardContainer}>
              {electoralRollMatches.map((option, idx) => (
                <ConstituentCard
                  key={idx}
                  details={option}
                  onClick={(selectedConstituent) => {
                    setConfirmDetails(
                      addEmailIfNotExists(fromEmailAddress, selectedConstituent)
                    );
                    setView("create");
                  }}
                />
              ))}
            </div>
          </React.Fragment>
        )}
        <Hr>{iln.gettext("Or")}</Hr>
        <div className={classes.center}>
          <ButtonBar>
            <Button onClick={() => setView("search")}>
              {iln.gettext("Search for a different constituent")}
            </Button>
          </ButtonBar>

          <ButtonBar>
            <Button onClick={() => setView("createConstituent")}>
              {iln.gettext("Create new constituent")}
            </Button>
            <Button onClick={() => setView("createOrganisation")}>
              {iln.gettext("Create new organisation")}
            </Button>
          </ButtonBar>
        </div>
      </p>
    </React.Fragment>
  ) : null;
};

MatchesAndActions.propTypes = propTypes;

export default MatchesAndActions;
