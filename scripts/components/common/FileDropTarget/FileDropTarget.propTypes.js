import PropTypes from "prop-types";

const propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  handleValidFile: PropTypes.func.isRequired,
  maxFileSize: PropTypes.number.isRequired,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  dropHereText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default propTypes;
