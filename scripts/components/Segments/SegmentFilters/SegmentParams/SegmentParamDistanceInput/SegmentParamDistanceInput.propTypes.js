import PropTypes from "prop-types";

export default {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  customClassNames: PropTypes.exact({
    label: PropTypes.string,
    container: PropTypes.string,
    input: PropTypes.string,
  }),
};
