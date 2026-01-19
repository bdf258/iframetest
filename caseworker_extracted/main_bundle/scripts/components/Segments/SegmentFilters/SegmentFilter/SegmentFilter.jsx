import { Card, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import SegmentCardCloseIcon from "./SegmentCardCloseIcon/SegmentCardCloseIcon.jsx";
import SegmentFiltersList from "./SegmentFiltersList/SegmentFiltersList.jsx";
import SegmentParams from "../SegmentParams/SegmentParams.jsx";
import SegmentQueryOperator from "./SegmentQueryOperator/SegmentQueryOperator.jsx";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import propTypes from "./SegmentFilter.propTypes";
import { useStyles } from "./SegmentFilter.styles";

const selectedFilterDetails = ({ selectedFilterId, segmentFilterOptions }) => {
  if (selectedFilterId === 0) return segmentFilterOptions[0];

  return segmentFilterOptions.find(({ ID }) => ID === selectedFilterId);
};

const SegmentFilter = ({
  segmentFilterOptions,
  initialValue,
  onChange,
  handleRemoveFilter,
  loadingResults = () => {},
  editable,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const [filterValue, setFilterValue] = useState(initialValue);
  const [selectedFilter, setSelectedFilter] = useState(
    selectedFilterDetails({
      selectedFilterId: initialValue.ID,
      segmentFilterOptions,
    })
  );

  /**
   * The data structure used is from the legacy segments page.
   * To get more clarity on the below, look at the constituents.php file.
   */
  const { ID, filterType } = filterValue;

  const handleFilterSelected = (e) => {
    const filterId = e.target.value;

    setSelectedFilter(() => {
      const selectedFilter = selectedFilterDetails({
        selectedFilterId: filterId,
        segmentFilterOptions,
      });

      const newValue = {
        ...filterValue,
        value1: selectedFilter.value1Default,
        value2: selectedFilter.value2Default,
        ID: filterId,
      };

      setFilterValue(() => newValue);
      onChange(newValue);
      return selectedFilter;
    });
  };
  const handleFilterChange = (value) => {
    setFilterValue({ ...filterValue, ...value });
    onChange({ ...filterValue, ...value });
  };

  /**
   * Each segment defines two flags—`value1Show` and `value2Show`—each set to `"1"` or `"0"`.
   * These flags control whether the corresponding input is displayed.
   * For segments of type `"multi"`, the first input is always shown, regardless of the values of `value1Show` or `value2Show`.
   **/

  return (
    <Card
      className={classnames(
        classes.card,
        !editable ? classes.filterDisabled : null
      )}
    >
      <FlexBox hAlign={"space-evenly"}>
        <div className={classes.filterContainer}>
          <FlexBox hAlign={"space-evenly"}>
            <SegmentQueryOperator
              value={filterType}
              onChange={handleFilterChange}
              customClassNames={{
                container: classes.inputContainer,
                label: classes.label,
              }}
            />
            <div className={classes.constituentLabelContainer}>
              {iln.gettext("profiles")}
            </div>
            <SegmentFiltersList
              value={ID}
              filters={segmentFilterOptions}
              onChange={handleFilterSelected}
              customClassNames={{
                container: classes.inputContainer,
                label: classes.label,
              }}
            />
          </FlexBox>
          {ID !== 0 && ID !== "0" && ID && (
            <SegmentParams
              customClassNames={{
                container: classes.inputContainer,
                label: classes.label,
              }}
              onChange={handleFilterChange}
              value={filterValue}
              selectedFilter={selectedFilter}
              loadingResults={loadingResults}
            />
          )}
        </div>
        {editable && <SegmentCardCloseIcon onClick={handleRemoveFilter} />}
      </FlexBox>
    </Card>
  );
};

SegmentFilter.propTypes = propTypes;
export default SegmentFilter;
