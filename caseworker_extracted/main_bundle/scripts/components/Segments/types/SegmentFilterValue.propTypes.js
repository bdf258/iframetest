import PropTypes from "prop-types";

export default PropTypes.shape({
  ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value1: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  value2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  filterType: PropTypes.string,
});
