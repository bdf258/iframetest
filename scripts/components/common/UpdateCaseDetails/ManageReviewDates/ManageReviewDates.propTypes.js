import PropTypes from "prop-types";

const propTypes = {
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ),
};

export default propTypes;
