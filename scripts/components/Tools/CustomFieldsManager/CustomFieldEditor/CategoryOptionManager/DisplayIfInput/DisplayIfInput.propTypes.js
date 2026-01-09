import PropTypes from "prop-types";
import field from "../../../propTypes/Field.propTypes";

export default {
  option: PropTypes.shape({
    active: PropTypes.bool,
    filterID: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }),
  selectedField: field,
  handleUpdateField: PropTypes.func.isRequired,
};
