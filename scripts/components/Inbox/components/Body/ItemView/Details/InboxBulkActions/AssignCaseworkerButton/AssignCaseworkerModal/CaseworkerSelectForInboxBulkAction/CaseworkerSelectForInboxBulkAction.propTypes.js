import PropTypes from "prop-types";

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  caseworkers: PropTypes.array.isRequired,
};

export default propTypes;
