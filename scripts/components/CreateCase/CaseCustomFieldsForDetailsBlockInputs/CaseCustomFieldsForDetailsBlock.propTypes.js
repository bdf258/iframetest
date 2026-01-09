import { PropTypes } from "prop-types";

export default {
  category: PropTypes.number,
  value: PropTypes.shape({
    [PropTypes.number]: PropTypes.oneOf([PropTypes.string, PropTypes.numbe]),
  }),
  onChange: PropTypes.func.isRequired,
};
