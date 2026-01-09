import PropTypes from "prop-types";

export default {
  doorknockingUsers: PropTypes.any,
  selectAll: PropTypes.func.isRequired,
  deselectAll: PropTypes.func.isRequired,
  bulkEditUsers: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired,
};
