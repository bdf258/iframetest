import PropTypes from "prop-types";

export default {
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
