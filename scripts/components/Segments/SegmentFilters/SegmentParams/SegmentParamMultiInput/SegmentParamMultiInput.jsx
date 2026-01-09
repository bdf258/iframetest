import { FormChipInput, Placeholder } from "@electedtech/electedtech-ui";
import React, { useEffect, useState } from "react";
import propTypes from "./SegmentParamMultiInput.propTypes";
import { useStyles } from "./SegmentParamMultiInput.styles";

/**
 * When no initial values or chips are provided, the legacy segments page returns an empty string rather than an empty array.
 */
const SegmentParamMultiInput = ({
  name,
  filterId,
  initialValue = [],
  onChange,
  customClassNames,
  loadingResults = () => {},
}) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (initialValue.length === 0) {
      setValue({
        value: "",
        chips: [],
      });
      setLoading(false);
      return;
    }

    /**
     * NOTE: "Do Not Contact Types" currently defaults to a single value "1" (i.e., 'Do not contact').
     * Unlike other multi-input items, this should default to an array of IDs: ["1", "2", "3", "4"],
     * representing: 'Do not contact', 'Do not contact via phone', 'Do not contact via post', and 'Do not contact via email'.
     * This logic is specific to this item and should be refactored or removed when the segments module is rewritten.
     **/

    if (
      name === "that have the following 'Do Not Contact' flag" &&
      initialValue === "1"
    ) {
      const defaultDoNotContactValues = ["1", "2", "3", "4"];

      setValue({
        value: "",
        chips: [],
      });
      onChange({ value1: defaultDoNotContactValues });
      initialValue = defaultDoNotContactValues;
    }

    loadingResults(true);

    const pendingItems = initialValue.map((itemId) => {
      return window.SEGMENTS_REACT_HANDLER_CHIP_TEXT({
        filterID: filterId,
        itemID: itemId,
      });
    });

    Promise.all(pendingItems)
      .then((itemWithText) => {
        setValue({
          value: "",
          chips: itemWithText.map((item) => {
            return {
              label: item.results[0]?.text || "",
              id: item.results[0].id || "",
            };
          }),
        });
      })
      .finally(() => {
        setLoading(false);
        loadingResults(false);
      });
  }, [filterId]);

  /**
   * Hooks into the legacy segments page.
   * Calls existing Ajax handler via window mounted event handler.
   */
  const fetchMultiFilterResults = async (searchTerm) => {
    loadingResults(true);
    try {
      const results = await window.SEGMENTS_REACT_HANDLER_MULTI_FILTER({
        filterID: filterId,
        searchTerm,
      });

      loadingResults(false);

      return results.results.map(({ id, text }) => ({ label: text, id }));
    } catch (error) {
      return [];
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
    onChange({
      value1: e.target.value.chips.map((item) => {
        return item.id;
      }),
    });
  };

  if (loading)
    return (
      <Placeholder className={classes.placeholder} height={30} width={"100%"} />
    );

  return (
    <FormChipInput
      customClassNames={customClassNames}
      value={value}
      name={"multiFilter"}
      onChange={(e) => handleOnChange(e)}
      chipSource={fetchMultiFilterResults}
      keepErrorSpacing={false}
    />
  );
};

SegmentParamMultiInput.propTypes = propTypes;
export default SegmentParamMultiInput;
