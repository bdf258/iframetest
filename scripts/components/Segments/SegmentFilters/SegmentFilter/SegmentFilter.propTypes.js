import PropTypes from "prop-types";
import segmentFilter from "../../types/SegmentFilters.propTypes";
import segmentFilterValue from "../../types/SegmentFilterValue.propTypes";

export default {
  segmentFilterOptions: PropTypes.arrayOf(segmentFilter),
  initialValue: segmentFilterValue,
  onChange: PropTypes.func.isRequired,
  loadingResults: PropTypes.func,
  editable: PropTypes.bool.isRequired,
};
