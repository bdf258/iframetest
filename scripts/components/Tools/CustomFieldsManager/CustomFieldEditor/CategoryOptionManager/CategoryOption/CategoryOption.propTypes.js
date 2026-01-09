import fieldPropTypes, { option } from "../../../propTypes/Field.propTypes";
import PropTypes from "prop-types";
export default {
  option: option,
  selectedField: fieldPropTypes,
  handleRemoveOption: PropTypes.func.isRequired,
  handleOptionNameChange: PropTypes.func.isRequired,
  handleUpdateField: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
