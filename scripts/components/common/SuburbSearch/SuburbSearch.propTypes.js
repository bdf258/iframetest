import PropTypes from "prop-types";

export default {
  label: PropTypes.string,
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
  }),
  handleResultSelected: PropTypes.func.isRequired,
  value: PropTypes.string,
  clearInputOnBlur: PropTypes.bool,
  keepErrorSpacing: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
