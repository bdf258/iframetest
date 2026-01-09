import { PropTypes } from "prop-types";

export default {
  parent_object: PropTypes.string.isRequired,
  parentObjectField: PropTypes.string.isRequired,
  parentObjectFieldOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleRemoveConditionalBlock: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};
