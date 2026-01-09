import PropTypes from "prop-types";

export default {
  name: PropTypes.string.isRequired,
  handleCustomFieldNameChange: PropTypes.func.isRequired,
  onUniqueName: PropTypes.func.isRequired,
  handleCustomFieldParentObjectChange: PropTypes.func.isRequired,
  editingExistingCustomBlock: PropTypes.bool.isRequired,
  parent_object: PropTypes.string.isRequired,
};
