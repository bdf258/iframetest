import { FormDatePicker, FormSelect } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { DATE_FORMAT } from "../../../../../consts/Date.js";
import { TranslationContext } from "context/translate";
import { add } from "date-fns";
import { localDateToUTCString } from "../../../../../../../helpers/timezoneHelpers.js";
import propTypes from "./CasesDateSelect.propTypes.js";
import useStyles from "./CasesDateSelect.styles.js";

const createdValue = "created";
const lastActionedValue = "lastActioned";
const reviewDateValue = "reviewDate";

const convertDateValue = ({ from, to }) => {
  const date = new Date(`${(from || to).replaceAll("-", "/")} UTC`);
  return localDateToUTCString(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      from ? 0 : 23,
      from ? 0 : 59,
      from ? 0 : 59
    )
  );
};

const CasesDateSelect = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.casesDateSelect}>
      <FormSelect
        value={state.filters.dateRange.type}
        name="assignedOrCreated"
        onChange={({ target: { value } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              dateRange: { ...state.filters.dateRange, type: value },
            },
          })
        }
        keepErrorSpacing={false}
        customClassNames={{ container: classes.typeSelectContainer }}
      >
        <option value={createdValue}>{iln.gettext("Created Between")}</option>
        <option value={lastActionedValue}>
          {iln.gettext("Last Actioned Between")}
        </option>
        <option value={reviewDateValue}>
          {iln.gettext("With a Review Date Between")}
        </option>
      </FormSelect>
      <FormDatePicker
        name="from"
        value={state.filters.dateRange.from}
        onChange={({ target: { name, value } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              dateRange: {
                ...state.filters.dateRange,
                [name]: convertDateValue({ [name]: value }),
              },
            },
          })
        }
        dropdownMode="select"
        hideClearButton
        keepErrorSpacing={false}
        dateFormat={DATE_FORMAT}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(state.filters.dateRange.to)}
        customClassNames={{
          input: classes.datepickerInput,
          container: classes.datepickerContainer,
        }}
      />
      <span className={classes.label}>{iln.gettext("and")}</span>
      <FormDatePicker
        name="to"
        value={state.filters.dateRange.to}
        onChange={({ target: { name, value } }) =>
          dispatch({
            type: "SET_FILTERS",
            payload: {
              ...state.filters,
              dateRange: {
                ...state.filters.dateRange,
                [name]: convertDateValue({ [name]: value }),
              },
            },
          })
        }
        dropdownMode="select"
        hideClearButton
        keepErrorSpacing={false}
        dateFormat={DATE_FORMAT}
        minDate={new Date(state.filters.dateRange.from)}
        maxDate={
          state.filters.dateRange.type === reviewDateValue
            ? add(new Date(), { years: 10 })
            : new Date()
        }
        customClassNames={{
          input: classes.datepickerInput,
          container: classes.datepickerContainer,
        }}
      />
    </div>
  );
};

CasesDateSelect.propTypes = propTypes;

export default CasesDateSelect;
