import PropTypes from "prop-types";

export default {
  parent_object: PropTypes.string.isRequired,
  handleParentObjectSelected: PropTypes.func.isRequired,
  selectedParentField: PropTypes.string.isRequired,
};
