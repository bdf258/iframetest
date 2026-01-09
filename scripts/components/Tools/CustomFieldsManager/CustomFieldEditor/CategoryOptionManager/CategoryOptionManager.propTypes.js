import PropTypes from "prop-types";
import field from "../../propTypes/Field.propTypes";
export default {
  selectedField: field,
  handleAddOption: PropTypes.func.isRequired,
  handleUpdateField: PropTypes.func.isRequired,
};
