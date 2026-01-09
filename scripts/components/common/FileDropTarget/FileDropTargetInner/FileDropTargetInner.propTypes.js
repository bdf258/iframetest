import PropTypes from "prop-types";

const propTypes = {
  fileCount: PropTypes.number,
  processed: PropTypes.number.isRequired,
  failures: PropTypes.shape({
    size: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    upload: PropTypes.number.isRequired,
  }).isRequired,
  dropHereText: PropTypes.string.isRequired,
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default propTypes;
