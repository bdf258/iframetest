import { FormDatePicker } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import propTypes from "./CustomFieldDate.propTypes";

const CustomFieldDate = ({
  value = new Date(),
  name,
  id,
  onChange,
  customClassNames,
}) => {
  return (
    <FormDatePicker
      name={name}
      label={name}
      value={value}
      onChange={(e) => onChange({ [id]: e.target.value })}
      keepErrorSpacing={false}
      customClassNames={{
        ...customClassNames,
        container: classnames(
          customClassNames.container,
          customClassNames?.inputSpecificClasses?.date?.container
        ),
      }}
      dateFormat={"dd/MM/yyyy"}
      minDate={new Date(2000, 0, 1)}
      maxDate={new Date(2050, 0, 1)}
    />
  );
};

CustomFieldDate.propTypes = propTypes;
export default CustomFieldDate;
