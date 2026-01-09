import PropTypes from "prop-types";

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default propTypes;
