import PropTypes from "prop-types";

export default {
  name: PropTypes.string,
  customClassNames: PropTypes.exact({
    container: PropTypes.string,
    label: PropTypes.string,
  }),
  filterId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  loadingResults: PropTypes.func,
};
