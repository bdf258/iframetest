import PropTypes from "prop-types";
import segmentFilter from "../../types/SegmentFilters.propTypes";

export default {
  onChange: PropTypes.func.isRequired,
  loadingResults: PropTypes.func,
  customClassNames: PropTypes.shape({
    select: PropTypes.string,
    input: PropTypes.string,
  }),
  selectedFilter: segmentFilter,
  value: PropTypes.shape({
    ID: PropTypes.string,
    value1: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    value2: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }),
};
