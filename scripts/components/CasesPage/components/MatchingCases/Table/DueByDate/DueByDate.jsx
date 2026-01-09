import React, { useContext } from "react";
import { format, isValid } from "date-fns";

import { DATE_FORMAT } from "../../../../consts/Date.js";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import propTypes from "./DueByDate.propTypes.js";
import { toLocalDate } from "../../../../../../helpers/timezoneHelpers.js";
import useGetReviewDateColourClass from "../../../../../ViewCase/hooks/useGetReviewDateColour.js";
import useStyles from "./DueByDate.styles.js";

const DueByDate = ({ reviewDate }) => {
  const convertedDate = toLocalDate(reviewDate);

  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { getReviewDateColourClass } = useGetReviewDateColourClass();

  if (!isValid(convertedDate)) return null;

  return (
    <div
      className={classnames(
        classes.dueByDate,
        getReviewDateColourClass(reviewDate)
      )}
    >
      {iln.gettext("Review on: %1", format(convertedDate, DATE_FORMAT))}
    </div>
  );
};

DueByDate.propTypes = propTypes;

export default DueByDate;
