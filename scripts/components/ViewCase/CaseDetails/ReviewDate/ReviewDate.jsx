import { FormTextInput, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import AddReviewDate from "../../common/AddReviewDate/AddReviewDate.jsx";
import { DATE_FORMAT } from "../../../../consts/Date";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import { format } from "date-fns";
import { isInvalidDateTime } from "../../../../helpers/formValidators.js";
import propTypes from "./ReviewDate.propTypes";
import scrollToCasenote from "../../helpers/scrollToCasenote.js";
import useGetReviewDateColourClass from "../../hooks/useGetReviewDateColour.js";
import { useReduxSlice } from "./ReviewDate.redux.js";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const formatDate = (date) => {
  if (isInvalidDateTime(date)) return "Invalid Date";
  const offset = -new Date().getTimezoneOffset();

  if (!date) return "Unknown";
  const dateAsIso = new Date(date).toISOString();
  return format(
    new Date(dateAsIso).setTime(
      new Date(dateAsIso).getTime(),
      offset * 60 * 1000
    ),
    DATE_FORMAT.DATE
  );
};

const getEarliestReview = (casenotes = []) => {
  let earliestDate = undefined;
  casenotes.forEach((nextCasenote) => {
    if (nextCasenote.type === "reviewDate" && !nextCasenote.detail.completed) {
      const nextReviewDate = new Date(nextCasenote.detail.reviewDate);
      if (earliestDate === undefined || nextReviewDate < earliestDate) {
        earliestDate = nextReviewDate;
      }
    }
  });
  return earliestDate ? formatDate(earliestDate) : "";
};

const ReviewDate = ({ customClassNames, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const { caseDetails, casenotes, addCasenote, updateCasenoteByID } =
    useReduxSlice();

  const earliestReview = getEarliestReview(casenotes);

  const { getReviewDateColourClass } = useGetReviewDateColourClass();

  const editShowAllOrCreateReviewDate = () => {
    const reviewDates = casenotes.filter(
      (casenote) => casenote.type === "reviewDate" && !casenote.detail.completed
    );

    switch (reviewDates.length) {
      case 0: {
        sliderActions.open({
          title: iln.gettext("Add a Review Date"),
          component: (
            <AddReviewDate
              key="create"
              caseID={caseDetails.id}
              addCasenote={addCasenote}
            />
          ),
        });
        break;
      }
      default: {
        const reviewDate = reviewDates[0];
        sliderActions.open({
          title: iln.gettext("Edit Review"),
          component: (
            <AddReviewDate
              key={`update${reviewDate.id}`}
              caseID={reviewDate.detail.caseID}
              existingReview={reviewDate}
              addCasenote={addCasenote}
              updateCasenoteByID={updateCasenoteByID}
            />
          ),
        });
        setTimeout(() => scrollToCasenote(reviewDate.id), 400);
        break;
      }
    }
  };

  return (
    <div
      className={classes.buttonInputWrapper}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => e.key === "Enter" && editShowAllOrCreateReviewDate()}
      onClick={() => editShowAllOrCreateReviewDate()}
    >
      <FormTextInput
        {...props}
        value={earliestReview || iln.gettext("Click to create review date")}
        customClassNames={{
          container: classes.noMargin,
          input: classnames(
            getReviewDateColourClass(earliestReview),
            !earliestReview && classes.placeholderText
          ),
          label: customClassNames.label,
        }}
      />
    </div>
  );
};

ReviewDate.propTypes = propTypes;

export default ReviewDate;
