import React, { useState } from "react";
import { differenceInYears, subYears } from "date-fns";

import { FormTextInput } from "@electedtech/electedtech-ui";
import format from "date-fns/format";
import propTypes from "./SegmentParamAgeInput.propTypes";

const maxAge = 110;
const minAge = 0;

const dateToNumber = (date) => {
  if (!date) return "";
  try {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const yearsDifference = differenceInYears(currentDate, inputDate);

    return yearsDifference.toString();
  } catch (error) {
    return date;
  }
};

const yearNumberToDate = (years) => {
  if (!years || isNaN(parseInt(years))) return "";

  const numberOfYears = parseInt(years);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const pastDate = subYears(currentDate, numberOfYears);

  return format(pastDate, "yyyy-MM-dd");
};

const validAge = (age) => {
  if (!age) return false;

  const trimmedAge = age.trim();
  const ageNumber = parseFloat(trimmedAge);

  if (isNaN(ageNumber)) return false;
  if (ageNumber > maxAge) return false;
  if (ageNumber < minAge) return false;

  return true;
};

const SegmentParamAgeInput = ({ className, onChange, value }) => {
  const [dateValue, setDateValue] = useState(value);

  const handleAgeChange = ({ newValue, originalValue }) => {
    if (!newValue) return "";
    if (validAge(newValue)) return yearNumberToDate(newValue);
    return originalValue;
  };

  return (
    <FormTextInput
      customClassNames={{ container: className }}
      name={"value1"}
      value={dateToNumber(dateValue)}
      onBlur={() => {
        onChange(dateValue);
      }}
      onChange={(e) => {
        setDateValue((originalDateValue) => {
          const age = e.target.value;
          return handleAgeChange({
            newValue: age,
            originalValue: originalDateValue,
          });
        });
      }}
      keepErrorSpacing={false}
    />
  );
};

SegmentParamAgeInput.propTypes = propTypes;

export default SegmentParamAgeInput;
