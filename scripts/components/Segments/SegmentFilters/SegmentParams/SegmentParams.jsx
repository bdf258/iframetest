import React from "react";
import SegmentParamInput from "./common/SegmentParamInput/SegmentParamInput.jsx";
import SegmentParamMultiInput from "./SegmentParamMultiInput/SegmentParamMultiInput.jsx";
import SegmentParamsAgedBetween from "./common/SegmentParamsAgedBetween/SegmentParamsAgedBetween.jsx";
import SegmentParamsColumnInput from "./SegmentParamColumnInput/SegmentParamsColumnInput.jsx";
import propTypes from "./SegmentParams.propTypes";

const SegmentParams = ({
  onChange,
  value,
  selectedFilter,
  customClassNames,
  loadingResults = () => {},
}) => {
  /**
   * The data structure used is from the legacy segments page.
   * To get more clarity on the below, look at the constituents.php file.
   */
  const { ID: filterId, value1, value2 } = value;
  const { type, name, value1Default, value2Show, value2Type } = selectedFilter;

  if (!type || !filterId) return null;

  if (type === "multi" || type === "distance") {
    return (
      <React.Fragment>
        <SegmentParamMultiInput
          name={name}
          customClassNames={customClassNames}
          filterId={filterId}
          initialValue={value1}
          onChange={onChange}
          loadingResults={loadingResults}
        />
        {value2Show === "1" && (
          <SegmentParamInput
            initialvalue={value1Default}
            customClassNames={customClassNames}
            onChange={(param) => onChange({ value2: param })}
            value={value2}
            type={value2Type}
          />
        )}
      </React.Fragment>
    );
  }

  if (type === "column") {
    /**
     * The data returned from the legacy segments page does not distinguish between dates and numbers, as both are represented as 'number' types.
     * To determine when to treat a value as a date, the name of the chosen segment is used as a reference.
     * This approach aligns with the decisions made in the legacy segments rivets UI.
     * The following logic is specific to this item and should be removed or refactored when the segments module is rewritten.
     **/
    if (name === "aged between") {
      return (
        <SegmentParamsAgedBetween
          onChange={onChange}
          value={value}
          selectedFilter={selectedFilter}
        />
      );
    }

    return (
      <SegmentParamsColumnInput
        onChange={onChange}
        value={value}
        selectedFilter={selectedFilter}
      />
    );
  }

  return null;
};

SegmentParams.propTypes = propTypes;
export default SegmentParams;
