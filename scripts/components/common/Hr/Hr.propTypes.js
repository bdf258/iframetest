import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default propTypes;
