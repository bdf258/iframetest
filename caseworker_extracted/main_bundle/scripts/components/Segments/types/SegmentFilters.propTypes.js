import PropTypes from "prop-types";

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value1Type: PropTypes.string,
  value1Show: PropTypes.string,
  value1Default: PropTypes.string,
  value2Type: PropTypes.string,
  value2Show: PropTypes.string,
  value2Default: PropTypes.string,
  category: PropTypes.string.isRequired,
  ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});
