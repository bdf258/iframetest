import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./SegmentFilersList.propTypes";

const SegmentFiltersList = ({
  onChange,
  customClassNames,
  filters = [],
  value = "",
}) => {
  return (
    <FormSelectAutoComplete
      name={"segmentParam"}
      customClassNames={customClassNames}
      onChange={onChange}
      keepErrorSpacing={false}
      value={value}
    >
      {filters.map((param) => (
        <option group={param.category} key={param.ID} value={param.ID}>
          {param.name}
        </option>
      ))}
    </FormSelectAutoComplete>
  );
};

SegmentFiltersList.propTypes = propTypes;
export default SegmentFiltersList;
