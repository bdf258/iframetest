import { ModalContext, Switcher } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CaseDetails from "./CaseDetails/CaseDetails.jsx";
import Complete from "./Complete/Complete.jsx";
import ConfirmEmailCount from "./ConfirmEmailCount/ConfirmEmailCount.jsx";
import MatchConstituents from "./MatchConstituents/MatchConstituents.jsx";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import api from "@electedtech/api";
import propTypes from "./propTypes.js";
import useBulkCaseState from "./hooks/useBulkCaseState.js";
import { useReduxSlice } from "./BulkCaseCreationModal.redux.js";

const BulkCaseCreationModal = ({ modalID }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { removeItems, itemsWithoutCases } = useReduxSlice();

  const [state, dispatch] = useBulkCaseState(itemsWithoutCases);

  return (
    <div>
      <Switcher selected={state.view}>
        {{
          caseDetails: (
            <CaseDetails
              onCreateCasesClick={({ caseDetails, matchDetails }) => {
                dispatch({ type: "SET_CASE_DETAILS", payload: caseDetails });
                dispatch({ type: "SET_MATCH_DETAILS", payload: matchDetails });
                dispatch({ type: "SET_VIEW", payload: "confirmEmailCount" });
              }}
            />
          ),
          confirmEmailCount: (
            <ConfirmEmailCount
              numberOfEmails={itemsWithoutCases.length}
              onBackClick={() =>
                dispatch({ type: "SET_VIEW", payload: "caseDetails" })
              }
              onConfirmClick={() =>
                dispatch({ type: "SET_VIEW", payload: "matchConstituents" })
              }
            />
          ),
          matchConstituents: (
            <MatchConstituents
              emails={itemsWithoutCases}
              onComplete={(casesToCreate) =>
                api
                  .createBulkCasesFromEmails(
                    {
                      emails: casesToCreate,
                      caseDetails: state.caseDetails,
                      matchDetails: state.matchDetails,
                    },
                    modalActions,
                    iln
                  )
                  .then(
                    ({
                      matched: casesMatched,
                      new: casesCreated,
                      actioned: emailsActioned,
                      cases,
                    }) => {
                      dispatch({
                        type: "SET_VIEW",
                        payload: "complete",
                      });
                      dispatch({
                        type: "SET_CASES_CREATED",
                        payload: casesCreated,
                      });
                      dispatch({
                        type: "SET_CASES_MATCHED",
                        payload: casesMatched,
                      });
                      dispatch({
                        type: "SET_EMAILS_ACTIONED",
                        payload: emailsActioned,
                      });

                      removeItems(cases.map(({ emailID }) => emailID));
                    }
                  )
              }
            />
          ),
          complete: (
            <Complete
              casesCreated={state.casesCreated}
              casesMatched={state.casesMatched}
              emailsActioned={state.emailsActioned}
              onConfirmClick={() => modalActions.removeById(modalID)}
            />
          ),
        }}
      </Switcher>
    </div>
  );
};

BulkCaseCreationModal.propTypes = propTypes;

export default BulkCaseCreationModal;
