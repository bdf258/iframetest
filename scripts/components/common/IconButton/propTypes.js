import PropTypes from "prop-types";

const propTypes = {
  onClick: PropTypes.func.isRequired,
  colour: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  icon: PropTypes.oneOf([
    "upArrow",
    "downArrow",
    "pencil",
    "cross",
    "plus",
    "bin",
  ]),
};

export default propTypes;
