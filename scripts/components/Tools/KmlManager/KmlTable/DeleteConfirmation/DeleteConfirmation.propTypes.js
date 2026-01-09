import PropTypes from "prop-types";

const propTypes = {
  kml: PropTypes.shape({
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
  modalID: PropTypes.string.isRequired,
};

export default propTypes;
