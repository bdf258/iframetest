import { PropTypes } from "prop-types";
import field from "../../propTypes/Field.propTypes";

export default {
  handleFormChange: PropTypes.func.isRequired,
  field: field,
  validCategory: PropTypes.shape({
    errorText: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }),
};
