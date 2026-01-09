import PropTypes from "prop-types";

const propTypes = {
  footer: PropTypes.node,
  header: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  main: PropTypes.node.isRequired,
  right: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default propTypes;
