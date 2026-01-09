import PropTypes from "prop-types";

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalID: PropTypes.string.isRequired,
  kml: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }),
};

export default propTypes;
