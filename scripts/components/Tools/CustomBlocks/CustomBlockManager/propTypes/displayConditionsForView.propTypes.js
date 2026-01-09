import PropTypes from "prop-types";

export const displayConditionForView = PropTypes.shape({
  parentObjectField: PropTypes.string.isRequired,
  parentObjectFieldOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]),
});
