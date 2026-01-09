import { createUseStyles, useTheme } from "react-jss";
import { differenceInDays, isValid, parse, parseISO } from "date-fns";

import { localDateToUTCDate } from "@electedtech/helpers/timezoneHelpers";

const useStyles = createUseStyles({
  reviewDateRed: {
    color: ({ theme }) => theme?.colours?.reviewDates?.red || "red",
  },
  reviewDateOrange: {
    color: ({ theme }) => theme?.colours?.reviewDates?.orange || "orange",
  },
  reviewDateGreen: {
    color: ({ theme }) => theme?.colours?.reviewDates?.green || "green",
  },
  reviewDateGrey: {
    color: ({ theme }) => theme?.colours?.reviewDates?.grey || "grey",
  },
});

const selectColour = (reviewDateString) => {
  let reviewDate = parse(reviewDateString, "dd/MM/yyyy", new Date());

  if (!isValid(reviewDate)) {
    reviewDate = parseISO(reviewDateString);
  }

  if (isValid(reviewDate)) {
    const localTodayMidnight = new Date();
    localTodayMidnight.setHours(0, 0, 0, 0);
    const todayUTC = localDateToUTCDate(localTodayMidnight);

    const daysUntilDue = differenceInDays(reviewDate, todayUTC);

    /**
     * Red:    due date is today, in the past or 1 day in the future
     * Orange: due date is between 2 and 7 days in the future
     * Green:  due date is between 8 and 14 days in the future
     * Grey:   due date is 15 or more days in the future
     */

    if (daysUntilDue <= 1) return "red";
    else if (daysUntilDue <= 7) return "orange";
    else if (daysUntilDue <= 14) return "green";
    else return "grey";
  }
};

const useGetReviewDateColourClass = () => {
  const theme = useTheme();
  const classes = useStyles(theme || {});

  const getReviewDateColourClass = (reviewDateString) => {
    const colour = selectColour(reviewDateString);
    switch (colour) {
      case "red":
        return classes.reviewDateRed;
      case "orange":
        return classes.reviewDateOrange;
      case "green":
        return classes.reviewDateGreen;
      default:
        return classes.reviewDateGray;
    }
  };

  const getReviewDateColour = (reviewDateString) => {
    const colour = selectColour(reviewDateString);
    switch (colour) {
      case "red":
        return theme?.colours?.reviewDates?.red || "red";
      case "orange":
        return theme?.colours?.reviewDates?.orange || "orange";
      case "green":
        return theme?.colours?.reviewDates?.green || "green";
      default:
        return theme?.colours?.reviewDates?.grey || "grey";
    }
  };

  return { getReviewDateColourClass, getReviewDateColour };
};

export default useGetReviewDateColourClass;
