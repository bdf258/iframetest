import PropTypes from "prop-types";

const propTypes = {
  handleSaveLetter: PropTypes.func.isRequired,
  handleSendViaEmail: PropTypes.func.isRequired,
  letterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  letterRef: PropTypes.string,
  parseLetter: PropTypes.func.isRequired,
};

export default propTypes;
