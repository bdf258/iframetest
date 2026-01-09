import PropTypes from "prop-types";
import field from "../propTypes/Field.propTypes";

export default {
  handleEditExistingField: PropTypes.func.isRequired,
  customFields: PropTypes.arrayOf(field),
};
