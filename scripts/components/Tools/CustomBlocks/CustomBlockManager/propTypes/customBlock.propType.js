import PropTypes from "prop-types";

export const displayCondition = PropTypes.shape({
  [PropTypes.oneOfType([PropTypes.string, PropTypes.number])]:
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.number),
    ]),
});

export const parent_object = PropTypes.oneOf([
  "cases",
  "constituents",
  "",
]).isRequired;

export const customBlock = PropTypes.shape({
  name: PropTypes.string,
  parent_object,
  type: PropTypes.oneOf(["core", "custom"]).isRequired,
  display_conditions: displayCondition,
});
