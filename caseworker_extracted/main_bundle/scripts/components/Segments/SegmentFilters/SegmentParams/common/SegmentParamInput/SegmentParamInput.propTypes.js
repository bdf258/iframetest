import PropTypes from "prop-types";
export default {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  initialValue: PropTypes.string,
  type: PropTypes.string,
  customClassNames: PropTypes.exact({
    container: PropTypes.string,
    label: PropTypes.string,
  }),
};
