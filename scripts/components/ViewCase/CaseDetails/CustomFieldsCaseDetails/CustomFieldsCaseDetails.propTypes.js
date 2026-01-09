import { PropTypes } from "prop-types";

export default {
  customFieldValues: PropTypes.shape({
    [PropTypes.number]: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  onChange: PropTypes.func.isRequired,
  caseCategory: PropTypes.number,
};
