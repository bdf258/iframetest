import PropTypes from "prop-types";

const propTypes = {
  value: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default propTypes;
