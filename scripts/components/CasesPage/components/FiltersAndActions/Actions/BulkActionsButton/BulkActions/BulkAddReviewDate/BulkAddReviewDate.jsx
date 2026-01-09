import { BE_DATE_FORMAT, DATE_FORMAT } from "../../../../../../consts/Date.js";
import {
  Button,
  FlexBox,
  NotificationBox,
  Step,
  Stepper,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { format, parseISO } from "date-fns";

import CaseworkerSelect from "../../../../../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import OperationCompletedModal from "../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import ReviewDatePicker from "../../../../../../../common/CaseDetailInputs/ReviewDatePicker.jsx";
import { TranslationContext } from "context/translate";
import addToDate from "date-fns/add";
import api from "@electedtech/api";
import formatNumberForDisplay from "../helpers/formNumberForDisplay.js";
import { getUserIdentity } from "../../../../../../../../helpers/localStorageHelper.js";
import propTypes from "./BulkAddReviewDate.propTypes.js";
import useStyles from "./BulkAddReviewDate.styles.js";

const { id: currentUserID } = getUserIdentity() || { id: undefined };

const toDate = (date) => {
  // if string it is already the date, otherwise add to today
  if (typeof date === "string") {
    return parseISO(date);
  } else if (date !== undefined) {
    return addToDate(new Date(), date);
  } else {
    return new Date();
  }
};

const tomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const BulkAddReviewDate = ({
  refreshResults,
  state,
  closeModal,
  onBackClick,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [step, setStep] = useState(0);
  const [reviewDate, setReviewDate] = useState();
  const [assignedTo, setAssignedTo] = useState(currentUserID);
  const [loading, setLoading] = useState(false);
  const [affectedCases, setAffectedCases] = useState();

  if (loading) return <ComponentLoading />;

  return (
    <Stepper step={step} className={classes.modal}>
      <Step>
        <p>{iln.gettext("Select the date or duration below")}:</p>
        <ReviewDatePicker
          name="review"
          placeholder="Click to assign"
          value={reviewDate}
          onChange={({ target: { value } }) => {
            setReviewDate(value);
          }}
          minDate={tomorrow()}
          customClassNames={{ container: classes.container }}
        />
        <CaseworkerSelect
          name="assignedTo"
          value={assignedTo}
          onChange={({ target: { value } }) => {
            setAssignedTo(value);
          }}
          caseworkers={state.caseworkers}
          customClassNames={{ container: classes.container }}
        />
        <FlexBox className={classes.buttonRow} hAlign="space-between">
          <Button onClick={onBackClick}>{iln.gettext("Back")}</Button>
          <Button
            onClick={() => setStep(1)}
            isDisabled={reviewDate === undefined || assignedTo === undefined}
          >
            {iln.gettext("Assign")}
          </Button>
        </FlexBox>
      </Step>

      <Step>
        <ConfirmationModal
          message={
            <div>
              <NotificationBox
                type="warn"
                alertMessage=" This cannot be undone"
              />
              <p>
                {iln.ngettext(
                  "Please confirm you wish to add a review date due on %1 to %2 case by typing the number of affected cases below",
                  "Please confirm you wish to add a review date due on %1 to %2 cases by typing the number of affected cases below",
                  format(toDate(reviewDate), DATE_FORMAT),
                  formatNumberForDisplay(state.results.totalResults)
                )}
              </p>
            </div>
          }
          buttonText="Confirm"
          confirmationValue={state.results.totalResults.toString()}
          modifyInputValues={(value) => value.replaceAll(",", "")}
          onConfirm={() => {
            setLoading(true);
            api
              .bulkAddReviewDate({
                caseSearch: state.filters,
                reviewDate: format(toDate(reviewDate), BE_DATE_FORMAT),
                assignedTo,
              })
              .then(({ reviewDatesSet }) => {
                setAffectedCases(reviewDatesSet);
                refreshResults();
                setLoading(false);
                setStep(2);
              });
          }}
        />
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p className={classes.center}>
            {iln.ngettext(
              "Review date successfully added to %1 case",
              "Review date successfully added to %1 cases",
              formatNumberForDisplay(affectedCases)
            )}
          </p>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

BulkAddReviewDate.propTypes = propTypes;

export default BulkAddReviewDate;
