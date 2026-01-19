import PropTypes from "prop-types";

export default {
  customClassNames: PropTypes.exact({
    label: PropTypes.string,
    container: PropTypes.string,
  }),
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  initialValue: PropTypes.string,
};
