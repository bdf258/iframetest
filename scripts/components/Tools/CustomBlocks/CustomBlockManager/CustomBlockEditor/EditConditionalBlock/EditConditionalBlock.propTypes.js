import PropTypes from "prop-types";
export default {
  modalId: PropTypes.string.isRequired,
  displayCondition: PropTypes.shape({
    parentObjectField: PropTypes.string,
    parentObjectFieldOptions: PropTypes.array,
  }),
  parent_object: PropTypes.string,
  handleSaveConditionalBlock: PropTypes.func.isRequired,
  existingConditionalBlock: PropTypes.bool,
};
