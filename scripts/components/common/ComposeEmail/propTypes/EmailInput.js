import PropTypes from "prop-types";

const propTypes = PropTypes.shape({
  value: PropTypes.string,
  chips: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
});

export default propTypes;
