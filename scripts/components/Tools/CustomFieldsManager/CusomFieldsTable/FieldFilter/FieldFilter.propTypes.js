import PropTypes from "prop-types";
export default {
  handleFilterChanged: PropTypes.func.isRequired,
  value: PropTypes.shape({
    object: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]),
    category: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]),
  }),
};
