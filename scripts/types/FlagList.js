import PropTypes from "prop-types";

const FlagListPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
]);

export default FlagListPropType;
