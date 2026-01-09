import PropTypes from "prop-types";
import field from "../propTypes/Field.propTypes";

export default {
  selectedField: field,
  handleUpdateField: PropTypes.func.isRequired,
  handleSaveField: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
