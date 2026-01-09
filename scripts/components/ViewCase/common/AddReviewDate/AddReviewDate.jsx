import {
  Button,
  FlexBox,
  FormTextareaInput,
  ModalContext,
  SliderContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import CaseworkerSelect from "../../../common/CaseDetailInputs/CaseworkerSelect/CaseworkerSelect.jsx";
import ReviewDatePicker from "../../../common/CaseDetailInputs/ReviewDatePicker.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { convertReviewDate } from "../../../../helpers/modifyCreateCaseDetailsForBackend.js";
import propTypes from "./propTypes";
import useResizeSlider from "../../../common/hooks/useResizeSlider.jsx";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";
import { userIdentity } from "../../../../helpers/localStorageHelper.js";

// import {
//   localDateToUTCString,
//   utcStringToLocalDate,
// } from "../../../../helpers/timezoneHelpers.js";

const formatDateStringForDisplay = (value) => {
  if (!value || typeof value !== "string") return value;

  const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));
    return parsed.toDateString();
  }

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? value : parsed.toDateString();
};

const AddReviewDate = ({
  existingReview,
  onCreation,
  onBackClick,
  backButtonText,
  caseworkers,
  caseID,
  addCasenote,
  updateCasenoteByID,
  buttonSize,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const initialReviewDate = existingReview?.detail?.reviewDate;
  const initialPickerValue = formatDateStringForDisplay(initialReviewDate);

  const [displayDate, setDisplayDate] = useState(initialPickerValue);
  const [date, setDate] = useState(initialReviewDate);
  const [assignedTo, setAssignedTo] = useState(
    existingReview ? existingReview.detail.assignedTo : userIdentity.id
  );
  const [note, setNote] = useState(
    existingReview ? existingReview.detail.note : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const { sliderActions } = useContext(SliderContext) || {};
  const { modalActions } = useContext(ModalContext) || {};
  const iln = useContext(TranslationContext);

  useResizeSlider(600, 1250);

  return (
    <React.Fragment>
      <ReviewDatePicker
        name="reviewOn"
        label={iln.gettext("Review On")}
        placeholder={iln.gettext("Click to assign")}
        value={displayDate}
        initialInputType={existingReview ? "date" : "timescale"}
        onChange={({ target: { value } }) => {
          if (value == undefined) {
            setDate(undefined);
            setDisplayDate(undefined);
            return;
          }
          if (typeof value === "string") {
            setDisplayDate(formatDateStringForDisplay(value));
            setDate(value);
            return;
          }
          if (typeof value === "object") {
            setDisplayDate(value);
            setDate(convertReviewDate(value));
            return;
          }
          setDisplayDate(value);
          setDate(value);
        }}
        keepErrorSpacing={false}
        customClassNames={{
          container: classes.datePickerContainer,
          label: classes.datePickerLabel,
        }}
      />
      <CaseworkerSelect
        name="assignedTo"
        label={iln.gettext("Assigned")}
        value={assignedTo}
        onChange={({ target: { value } }) => setAssignedTo(value)}
        keepErrorSpacing={false}
        caseworkers={caseworkers}
        customClassNames={{
          container: classes.assignContainer,
        }}
      />
      <FormTextareaInput
        name="note"
        label={iln.gettext("Note")}
        value={note}
        onChange={({ target: { value } }) => setNote(value)}
        keepErrorSpacing={false}
        minHeight={78}
        customClassNames={{
          container: classes.noteContainer,
        }}
      />
      <FlexBox hAlign={!onBackClick ? "flex-end" : "space-between"}>
        {onBackClick && (
          <Button onClick={onBackClick} size={buttonSize}>
            {backButtonText || iln.gettext("Back")}
          </Button>
        )}
        <Button
          isDisabled={date === undefined || isSaving}
          size={buttonSize}
          onClick={() => {
            if (isSaving) return;
            setIsSaving(true);
            return existingReview
              ? api
                  .updateReviewDate(
                    existingReview.detail.id,
                    {
                      reviewDate: date,
                      assignedTo,
                      note,
                    },
                    modalActions,
                    iln
                  )
                  .then((detail) => {
                    updateCasenoteByID({
                      noteId: detail.id,
                      casenote: {
                        ...{ ...existingReview, timestamp: detail.reviewDate },
                        detail,
                      },
                    });
                    setIsSaving(false);
                    sliderActions && sliderActions.close();
                  })
              : api
                  .createReviewDate(
                    {
                      reviewDate: date,
                      caseID,
                      assignedTo,
                      note,
                    },
                    modalActions,
                    iln
                  )
                  .then((casenote) => {
                    addCasenote({
                      ...casenote,
                      timestamp: casenote.detail.reviewDate,
                    });
                    sliderActions && sliderActions.close();
                    onCreation && onCreation(casenote);
                    setIsSaving(false);
                  });
          }}
        >
          {isSaving ? (
            <Spinner scale={0.5} />
          ) : existingReview ? (
            iln.gettext("Update Review")
          ) : (
            iln.gettext("Add Review")
          )}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

AddReviewDate.propTypes = propTypes;

export default AddReviewDate;
