import PropTypes from "prop-types";
import field from "../propTypes/Field.propTypes";
export default {
  navigateBack: PropTypes.func.isRequired,
  selectedField: field,
  handleSaveField: PropTypes.func.isRequired,
  handleUpdateField: PropTypes.func.isRequired,
};
