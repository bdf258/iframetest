import EmailInput from "../propTypes/EmailInput";
import PropTypes from "prop-types";

const propTypes = {
  hasDuplicates: PropTypes.bool,
  customClassNames: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  toggleInputVisibility: PropTypes.func,
  value: EmailInput,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  innerComponent: PropTypes.bool,
};

export default propTypes;
