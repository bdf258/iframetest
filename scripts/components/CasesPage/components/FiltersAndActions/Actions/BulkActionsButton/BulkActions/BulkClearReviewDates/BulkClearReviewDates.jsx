import { NotificationBox, Step, Stepper } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import propTypes from "./BulkClearReviewDates.propTypes.js";

const BulkClearReviewDates = ({
  state,
  refreshResults,
  closeModal,
  onBackClick,
}) => {
  const iln = useContext(TranslationContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(0);
  const [affectedCases, setAffectedCases] = useState();

  if (loading) return <ComponentLoading />;

  return (
    <Stepper step={step}>
      <Step>
        <ConfirmationModal
          message={
            <React.Fragment>
              <NotificationBox
                type="warn"
                alertMessage={iln.gettext("This cannot be undone")}
              />
              <p>
                {iln.gettext("Please confirm you wish to")}{" "}
                <strong>{iln.gettext("clear the review dates")}</strong>{" "}
                {iln.ngettext(
                  "on %1 case by typing the number of affected cases below",
                  "on %1 cases by typing the number of affected cases below",
                  formatNumberForDisplay(state.results.totalResults)
                )}
              </p>
            </React.Fragment>
          }
          buttonText={iln.gettext("Confirm")}
          confirmationValue={state.results.totalResults}
          modifyInputValues={(value) => value.replaceAll(",", "")}
          onCancel={onBackClick}
          cancelButtonText={iln.gettext("Back")}
          onConfirm={() => {
            setLoading(true);
            api
              .bulkClearReviewDate({ caseSearch: state.filters })
              .then(({ reviewDatesCleared }) => {
                setAffectedCases(reviewDatesCleared);
                refreshResults();
                setStep(1);
                setLoading(false);
              });
          }}
        />
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p>
            {iln.ngettext(
              "%1 Review date cleared",
              "%1 Review dates cleared",
              affectedCases
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

BulkClearReviewDates.propTypes = propTypes;

export default BulkClearReviewDates;
