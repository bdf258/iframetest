import PropTypes from "prop-types";

export default {
  parentObjectFieldOptions: PropTypes.arrayOf(PropTypes.number),
  parentObjectField: PropTypes.string.isRequired,
  handleOptionSelected: PropTypes.func.isRequired,
  handleRemoveOption: PropTypes.func.isRequired,
  handleAddParentObjectFieldType: PropTypes.func.isRequired,
};
