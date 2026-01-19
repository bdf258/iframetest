import PropTypes from "prop-types";
import segmentFilterValue from "../../../../types/SegmentFilterValue.propTypes";
import segmentFilters from "../../../../types/SegmentFilters.propTypes";

export default {
  value: segmentFilterValue,
  selectedFilter: segmentFilters,
  onChange: PropTypes.func.isRequired,
};
