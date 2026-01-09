import PropTypes from "prop-types";

const propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.string.isRequired,
  connectionTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string,
    })
  ),
};

export default propTypes;
