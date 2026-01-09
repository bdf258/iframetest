import PropTypes from "prop-types";

const propTypes = {
  label: PropTypes.node,
  value: PropTypes.node,
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default propTypes;
