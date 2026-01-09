import PropTypes from "prop-types";
import field from "../../propTypes/Field.propTypes";

export default {
  additionalDisplayBlocks: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ),
  selectedField: field,
  handleFormChange: PropTypes.func.isRequired,
};
