import { FormSelect } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./SegmentQueryOperator.propTypes";
import { useStyles } from "./SegmentQueryOperator.styles";

/**
 * The option values below use different casing to remain consistent with the legacy segments data structure.
 */
const queryOperators = [
  {
    label: "Only include",
    value: "include",
  },
  {
    label: "Exclude",
    value: "Exclude",
  },
];
const SegmentQueryOperator = ({ onChange, customClassNames, value = "" }) => {
  const classes = useStyles();
  const [selectedFilter, setSelectedFilter] = React.useState(value);

  return (
    <FormSelect
      name={"SegmentQueryOperator"}
      onChange={(e) => {
        const filterType = e.target.value;
        setSelectedFilter(filterType);
        onChange({ filterType });
      }}
      keepErrorSpacing={false}
      customClassNames={{
        ...customClassNames,
        container: classes.inputContainer,
      }}
      value={selectedFilter}
    >
      {queryOperators.map((queryOperator) => (
        <option key={queryOperator.value} value={queryOperator.value}>
          {queryOperator.label}
        </option>
      ))}
    </FormSelect>
  );
};

SegmentQueryOperator.propTypes = propTypes;
export default SegmentQueryOperator;
