import {
  Button,
  FlexBox,
  FormDatePicker,
  FormSelect,
} from "@electedtech/electedtech-ui";
import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import addToDate from "date-fns/add";
import classnames from "classnames";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  container: { flexBasis: "50%" },
  timescalePicker: {
    backgroundColor: "rgb(246, 246, 246)",
    border: "1px solid rgb(192, 192, 192)",
    display: "flex",
    alignItems: "center",
    height: "30px",
  },
  timescalePickerLabel: {
    backgroundColor: "#dcdcdc",
    lineHeight: "30px",
    fontSize: "0.9rem",
    minWidth: "90px",
    padding: {
      left: "8px",
      right: "8px",
    },
    borderRight: "1px solid rgb(192, 192, 192)",
  },
  formSelectContainer: {
    margin: 0,
    height: 25,
  },
  formSelectSelect: {
    margin: 0,
  },
  typeSelect: {
    minWidth: 83,
  },
  durationSelect: {
    minWidth: 50,
  },
  leftSpacing: {
    padding: {
      left: 8,
    },
  },
  toggleButton: {
    whiteSpace: "nowrap",
    fontSize: ({ theme }) => theme.font.sizes.normal,
    margin: {
      right: 8,
    },
  },
  removeMargin: {
    margin: 0,
  },
  buttonFix: {
    "&:active": {
      backgroundColor: "inherit",
      color: "inherit",
    },
    "&:hover": {
      background: "inherit",
      color: "inherit",
    },
  },
  durationButtons: {
    margin: {
      right: 8,
    },
  },
});

const makeNOptions = (count) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <option value={i + 1} key={i}>
        {i + 1}
      </option>
    );
  }
  return elements;
};

const isDateString = (value) =>
  value && typeof value === "string" && !isNaN(new Date(value).getTime());

const isAddDateObj = (value) =>
  value && (value.days || value.months || value.years);

const handleChange = (name, onChange, value) => {
  onChange({
    target: {
      name,
      value,
    },
  });
};

const toggleComponent = ({ classes, inputType, setInputType, onToggle }) => (
  <Button
    type="text"
    customClassNames={classnames(classes.toggleButton, classes.buttonFix)}
    onClick={() => onToggle({ inputType, setInputType })}
  >
    {inputType === "date" ? "Choose Timescale" : "Choose Date"}
  </Button>
);

const isSingular = (value) =>
  value?.days === 1 || value?.months === 1 || value?.years === 1;

const getTimescaleUnit = (value) => {
  if (value?.days) return "days";
  if (value?.months) return "months";
  if (value?.years) return "years";
  return "days";
};

const getTimescaleAmount = (value) =>
  value?.days || value?.months || value?.years || 1;

const getOptionCount = (unit) => {
  switch (unit) {
    case "months":
      return 12;
    case "years":
      return 5;
    case "days":
    default:
      return 30;
  }
};

const ReviewDatePicker = ({
  name,
  value,
  onChange,
  maxDate,
  minDate,
  customClassNames = {},
  datePickerOnly,
  hideClearButton,
  onClear,
  initialInputType = "date",
  label = "Review",
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const getValueType = (candidate) => {
    return candidate === undefined || isDateString(candidate)
      ? "date"
      : isAddDateObj(candidate)
      ? "timescale"
      : "date";
  };

  const determineInitialInputType = () => {
    const valueType = getValueType(value);
    if (valueType === "date" && value === undefined) {
      return initialInputType;
    }
    return valueType;
  };

  const [inputType, setInputType] = useState(determineInitialInputType);
  const [lastDateValue, setLastDateValue] = useState(
    isDateString(value) ? value : undefined
  );
  const [lastTimescaleValue, setLastTimescaleValue] = useState(
    isAddDateObj(value) ? value : { days: 1 }
  );

  useEffect(() => {
    if (value === undefined) return;
    if (isDateString(value)) {
      setInputType("date");
      setLastDateValue(value);
    } else if (isAddDateObj(value)) {
      setInputType("timescale");
      setLastTimescaleValue(value);
    }
  }, [value]);

  const emitChange = (nextValue) => {
    if (isDateString(nextValue)) {
      setLastDateValue(nextValue);
    } else if (isAddDateObj(nextValue)) {
      setLastTimescaleValue(nextValue);
    }
    handleChange(name, onChange, nextValue);
  };

  const getTimescaleValue = () =>
    (isAddDateObj(value) ? value : lastTimescaleValue) || { days: 1 };

  const handleToggle = ({ inputType, setInputType }) => {
    const changeTo = inputType === "date" ? "timescale" : "date";
    setInputType(changeTo);
    if (changeTo === "timescale") {
      const nextTimescale = getTimescaleValue();
      setLastTimescaleValue(nextTimescale);
      emitChange(nextTimescale);
    } else {
      const nextDate = isDateString(value) ? value : lastDateValue;
      emitChange(nextDate);
    }
  };

  const activeTimescale = getTimescaleValue();
  const timescaleUnit = getTimescaleUnit(activeTimescale);
  const timescaleAmount = getTimescaleAmount(activeTimescale);

  return (
    <div
      className={classnames(
        classes.container,
        customClassNames.container || null
      )}
    >
      {inputType === "date" ? (
        <FormDatePicker
          label={label}
          clearButton={
            !hideClearButton && value !== undefined
              ? () => {
                  handleChange(name, onChange, undefined);
                  onClear && onClear();
                }
              : undefined
          }
          name={name}
          value={value}
          onChange={(e) => {
            emitChange(e.target.value);
          }}
          keepErrorSpacing={false}
          maxDate={maxDate || addToDate(new Date(), { years: 5 })}
          minDate={minDate}
          innerComponent={
            !datePickerOnly &&
            toggleComponent({
              classes,
              inputType,
              setInputType,
              onToggle: handleToggle,
            })
          }
          customClassNames={{
            ...customClassNames,
            container: classes.removeMargin,
          }}
          {...props}
        />
      ) : (
        <div className={classes.timescalePicker}>
          <label
            htmlFor="durationSelect"
            className={classnames(
              classes.timescalePickerLabel,
              customClassNames.label || null
            )}
          >
            {label}
          </label>
          <div className={classes.leftSpacing}>
            <FormSelect
              name="durationSelect"
              value={inputType === "timescale" ? timescaleAmount : 1}
              customClassNames={{
                container: classes.formSelectContainer,
                select: classnames(
                  classes.formSelectSelect,
                  classes.durationSelect
                ),
              }}
              keepErrorSpacing={false}
              onChange={(e) => {
                const nextValue = {
                  [timescaleUnit]: parseInt(e.target.value, 10),
                };
                setLastTimescaleValue(nextValue);
                emitChange(nextValue);
              }}
            >
              {makeNOptions(getOptionCount(timescaleUnit))}
            </FormSelect>
          </div>
          <div className={classes.leftSpacing}>
            <FormSelect
              name="timescaleSelect"
              value={inputType === "timescale" ? timescaleUnit : "days"}
              customClassNames={{
                container: classes.formSelectContainer,
                select: classnames(
                  classes.formSelectSelect,
                  classes.typeSelect
                ),
              }}
              keepErrorSpacing={false}
              onChange={(e) => {
                const selected = e.target.value;

                let maxDuration = null;
                if (selected === "years" && timescaleAmount > 5) {
                  maxDuration = 5;
                } else if (selected === "months" && timescaleAmount > 12) {
                  maxDuration = 12;
                }
                const nextValue = {
                  [selected]: maxDuration || timescaleAmount,
                };
                setLastTimescaleValue(nextValue);
                emitChange(nextValue);
              }}
            >
              <option value="days">
                {isSingular(activeTimescale) ? "Day" : "Days"}
              </option>
              <option value="months">
                {isSingular(activeTimescale) ? "Month" : "Months"}
              </option>
              <option value="years">
                {isSingular(activeTimescale) ? "Year" : "Years"}
              </option>
            </FormSelect>
          </div>
          <FlexBox
            hAlign="flex-end"
            vAlign="center"
            className={classes.durationButtons}
          >
            {toggleComponent({
              classes,
              inputType,
              setInputType,
              onToggle: handleToggle,
            })}
            <Button
              type="text"
              className={classes.buttonFix}
              onClick={() => {
                handleChange(name, onChange, undefined);
                setInputType("date");
              }}
            >
              Clear
            </Button>
          </FlexBox>
        </div>
      )}
    </div>
  );
};

ReviewDatePicker.propTypes = {
  customClassNames: propTypes.shape({
    container: propTypes.string,
  }),
  datePickerOnly: propTypes.bool,
  hideClearButton: propTypes.bool,
  initialInputType: propTypes.oneOf(["date", "timescale"]),
  label: propTypes.string,
  maxDate: propTypes.instanceOf(Date),
  minDate: propTypes.instanceOf(Date),
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onClear: propTypes.func,
  value: propTypes.oneOfType([
    propTypes.shape({
      days: propTypes.number,
    }).isRequired,
    propTypes.shape({
      months: propTypes.number,
    }).isRequired,
    propTypes.shape({
      years: propTypes.number,
    }).isRequired,
    propTypes.string.isRequired,
  ]),
};

export default ReviewDatePicker;
