import { Button, FlexBox, NotificationBox } from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import SegmentFilter from "./SegmentFilter/SegmentFilter.jsx";
import { TranslationContext } from "context/translate";

const BLANK_FILTER = {
  filterType: "",
  ID: 0,
  value1: "1",
  value2: "0",
};

/**
 * The initial filter values generated on the constituents.php page are assigned numeric IDs.
 * After a filter is saved, it is returned as a string identifier from the same page.
 * To maintain consistency, the following logic normalizes numeric IDs by converting them to strings.
 */
const cleanUpFilterValues = (filterValues) => {
  return filterValues.map((filterValue) => {
    return {
      ...filterValue,
      ID: filterValue?.ID.toString() || "",
    };
  });
};

/**
 * Editable can either be "1", 1, "0", 0, below handles the inconsistent data types.
 * @param editable
 * @returns {boolean}
 */
const isEditable = (editable) => {
  if (editable === undefined || editable === null) return false;
  return parseInt(editable) === 1;
};

const SegmentFilters = () => {
  const iln = useContext(TranslationContext);

  const [segmentFilterOptions, setSegmentFilterOptions] = useState([]);
  const [editable, setEditable] = useState();
  const [segmentFilterValues, setSegmentFilterValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledAddNewSegmentButton, setDisabledAddNewSegmentButton] =
    useState(false);

  /**
   * Segment Filters integrate with the existing segments page.
   * The constituents.php file implements the segments page and manages filter state.
   * Filter state is stored on the window object for compatibility.
   * As a result, the state structure and component design may not fully align with ideal data models or React best practices.
   * This implementation is an interim solution until the segments page is fully rewritten.
   */

  useEffect(() => {
    /**
     * The value from the window behaves inconsistently.
     * It may be present or absent in different scenarios.
     * Similarly, the filter may be defined or null.
     */
    if (window?.segmentFilters) {
      setSegmentFilterOptions(() => {
        return window.segmentFilters.filter((filter) => filter);
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("rivets:viewChange", ({ detail }) => {
      if (detail?.filterValues) {
        setEditable(isEditable(detail?.editable));
        setSegmentFilterValues(() => cleanUpFilterValues(detail?.filterValues));
        setLoading(false);
      }
    });
    return () => document.removeEventListener("rivets:viewChange");
  }, []);

  const handleSegmentFilterChange = ({ newFilter }) => {
    setSegmentFilterValues((segmentFilterValues) => {
      const newSegmentFilters = segmentFilterValues.map(
        (segmentFilterValue) => {
          if (
            parseInt(segmentFilterValue.index) === parseInt(newFilter.index)
          ) {
            return newFilter;
          }
          return segmentFilterValue;
        }
      );

      window.SEGMENTS_REACT_HANDLER_SAVE_SEGMENT_FILTERS({
        filters: newSegmentFilters,
      });

      return newSegmentFilters;
    });
  };

  const removeFilter = ({ index }) => {
    setSegmentFilterValues((segmentFilterValues) => {
      const newSegmentFilters = segmentFilterValues
        .filter((segmentFilterValue) => {
          return segmentFilterValue.index !== index;
        })
        .map((segmentFilterValue, index) => ({
          ...segmentFilterValue,
          index,
        }));

      window.SEGMENTS_REACT_HANDLER_SAVE_SEGMENT_FILTERS({
        filters: newSegmentFilters,
      });

      return newSegmentFilters;
    });
  };

  const addNewBlankFilter = () => {
    const newBlankFilter = {
      ...BLANK_FILTER,
      index: segmentFilterValues.length,
    };

    setSegmentFilterValues([...segmentFilterValues, newBlankFilter]);

    window.SEGMENTS_REACT_HANDLER_ADD_BLANK_SEGMENT_FILTER({
      filter: newBlankFilter,
    });
  };

  if (!segmentFilterOptions || segmentFilterOptions.length === 0) {
    return (
      <NotificationBox
        type={"info"}
        alertMessage={iln.gettext(
          "There are no segment filters available on your installation, please contact support."
        )}
      />
    );
  }

  return (
    <React.Fragment>
      <h3>{iln.gettext("Segment Filters")}</h3>
      {setSegmentFilterValues &&
        segmentFilterValues.length > 0 &&
        segmentFilterValues.map((segmentFilterValue) => {
          const { index, ID = "" } = segmentFilterValue;
          return (
            <SegmentFilter
              editable={editable}
              key={`${ID}${index}`}
              segmentFilterOptions={segmentFilterOptions}
              initialValue={segmentFilterValue}
              onChange={(newFilter) => handleSegmentFilterChange({ newFilter })}
              handleRemoveFilter={() => removeFilter({ index })}
              loadingResults={(disabled) =>
                setDisabledAddNewSegmentButton(disabled)
              }
            />
          );
        })}
      {editable && (
        <FlexBox hAlign={"end"}>
          <Button
            onClick={() => addNewBlankFilter()}
            isDisabled={loading || disabledAddNewSegmentButton}
          >
            {iln.gettext("Add Filter")}
          </Button>
        </FlexBox>
      )}
    </React.Fragment>
  );
};

export default SegmentFilters;
