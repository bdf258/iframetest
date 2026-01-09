import PropTypes from "prop-types";

export default {
  caseCategory: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
