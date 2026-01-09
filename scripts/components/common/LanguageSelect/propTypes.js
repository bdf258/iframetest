import PropTypes from "prop-types";

const propTypes = {
  onChange: PropTypes.func.isRequired,
  customClassNames: PropTypes.exact({
    label: PropTypes.string,
    container: PropTypes.string,
  }),
};

export default propTypes;
