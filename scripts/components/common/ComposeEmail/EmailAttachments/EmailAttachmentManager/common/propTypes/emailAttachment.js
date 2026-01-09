import PropTypes from "prop-types";

const propTypes = {
  fileType: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default propTypes;
