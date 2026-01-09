import { FormDatePicker, FormHandler } from "@electedtech/electedtech-ui";

import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  datePicker: {
    maxWidth: 300,
  },
  dateLabel: {
    maxWidth: 50,
  },
  margins: {
    margin: "20px 0 20px 0",
  },
});

function DateSelector({
  dates,
  setDates,
  dateErrorTo,
  dateErrorFrom,
  setDateErrorTo,
  setDateErrorFrom,
}) {
  //Date Selector needs useState hook variables from parent to set dates and errors
  const dateFormatter = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };
  const formSubmit = (form) => {
    const validRange = () => new Date(form.from) - new Date(form.to) <= 0;
    form.from && form.to == null
      ? setDateErrorTo("Set End Date")
      : setDateErrorTo("");
    form.to && form.from == null
      ? setDateErrorFrom("Set Start Date")
      : setDateErrorFrom("");
    if (form.from && form.to) {
      validRange()
        ? setDateErrorFrom("")
        : setDateErrorFrom("'From' should be earlier then 'To' ");
    }
    form.to &&
      form.from &&
      validRange() &&
      setDates({
        ...dates,
        from: dateFormatter(form.from),
        to: dateFormatter(form.to),
      });
  };
  const classes = useStyles();

  return (
    <>
      <h3 className={classes.margins}>Select Dates</h3>
      <FormHandler
        autoSubmit={true}
        equaliseLabelWidth={true}
        onSubmit={(form) => formSubmit(form)}
      >
        <FormDatePicker
          error={dateErrorFrom}
          name="from"
          label="From"
          dateFormat="d MMMM, yyy"
          keepErrorSpacing={true}
          customClassNames={{
            container: classes.datePicker,
            label: classes.dateLabel,
          }}
        />
        <FormDatePicker
          error={dateErrorTo}
          name="to"
          label="To"
          dateFormat="d MMMM, yyy"
          keepErrorSpacing={true}
          customClassNames={{
            container: classes.datePicker,
            label: classes.dateLabel,
          }}
        />
      </FormHandler>
    </>
  );
}

DateSelector.propTypes = {
  dateErrorFrom: PropTypes.string,
  dateErrorTo: PropTypes.string,
  dates: PropTypes.any,
  setDateErrorFrom: PropTypes.func,
  setDateErrorTo: PropTypes.func,
  setDates: PropTypes.func,
};

export default DateSelector;
