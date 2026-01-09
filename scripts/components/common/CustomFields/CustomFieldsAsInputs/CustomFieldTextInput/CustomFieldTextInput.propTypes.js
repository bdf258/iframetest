import PropTypes from "prop-types";

export default {
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
  }),
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
