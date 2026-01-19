import PropTypes from "prop-types";
import segmentFilter from "../../../types/SegmentFilters.propTypes";

export default {
  filters: PropTypes.arrayOf(segmentFilter),
  onChange: PropTypes.func.isRequired,
  customClassNames: PropTypes.shape({
    select: PropTypes.string,
    input: PropTypes.string,
  }),
  value: PropTypes.string,
};
