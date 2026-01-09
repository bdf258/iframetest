import PropTypes from "prop-types";

export default {
  parent_object: PropTypes.string.isRequired,
  parentObjectFieldOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  displayCondition: PropTypes.oneOfType([PropTypes.number]),
  caseFieldOption: PropTypes.string.isRequired,
  handleOptionSelected: PropTypes.func.isRequired,
  handleRemoveOption: PropTypes.func.isRequired,
};
