import React, { useContext, useState } from "react";
import {
  convertReviewDate,
  getTagIDs,
} from "../../../../../../../../../../helpers/modifyCreateCaseDetailsForBackend.js";

import { Button } from "@electedtech/electedtech-ui";
import CaseDetailsForm from "../../../../../../../../../common/CreateCaseForm/index.js";
import CaseMatchDetails from "./CaseMatchDetails/CaseMatchDetails.jsx";
import CaseTemplatesAutoComplete from "../../../../../../../../../common/CreateCase/CaseTemplateAutoComplete/CaseTemplateAutoComplete.jsx";
import MatchCaseSelect from "./MatchCaseSelect/MatchCaseSelect.jsx";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext.js";
import initCaseDetails from "../../../../../../../../../../consts/initCaseDetails.js";
import propTypes from "./propTypes.js";
import { useReduxSlice } from "./CaseDetails.redux.js";
import { useStyles } from "./styles.js";

const { category, caseType, tagged } = initCaseDetails;
const initMatchDetails = { category, caseType, tagged };

const CaseDetails = ({ onCreateCasesClick }) => {
  const classes = useStyles();
  const [caseDetails, setCaseDetails] = useState(initCaseDetails);
  const [matchCase, setMatchCase] = useState(false);
  const [matchDetails, setMatchDetails] = useState(initMatchDetails);

  const { caseworkers } = useReduxSlice();

  const iln = useContext(TranslationContext);

  return (
    <div className={classes.container}>
      <h3>{iln.gettext("Case to be created")}</h3>
      <CaseTemplatesAutoComplete
        onTemplateSelect={(template) => setCaseDetails(template)}
        customClassNames={{ container: classes.spacing }}
      />
      <CaseDetailsForm
        caseDetails={caseDetails}
        caseworkers={caseworkers}
        setCaseDetails={(e) => setCaseDetails(e)}
      />
      <MatchCaseSelect matchCase={matchCase} setMatchCase={setMatchCase} />
      {matchCase && (
        <CaseMatchDetails
          matchDetails={matchDetails}
          updateState={({ target: { name, value } }) =>
            setMatchDetails({ ...matchDetails, [name]: value })
          }
        />
      )}
      <div className={classes.alignRight}>
        <Button
          onClick={() =>
            onCreateCasesClick({
              caseDetails: {
                ...caseDetails,
                tagged: getTagIDs(caseDetails.tagged),
                reviewDate: convertReviewDate(caseDetails.reviewDate),
              },
              matchDetails: matchCase
                ? {
                    ...matchDetails,
                    tagged: getTagIDs(matchDetails.tagged),
                  }
                : undefined,
            })
          }
        >
          {iln.gettext("Create Cases")}
        </Button>
      </div>
    </div>
  );
};

CaseDetails.propTypes = propTypes;

export default CaseDetails;
