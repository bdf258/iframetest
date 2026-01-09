import PropTypes from "prop-types";

const propTypes = {
  addReviewFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  caseDetails: PropTypes.object,
  columns: PropTypes.object,
  file: PropTypes.object,
  firstLineHeader: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keepExistingContactDetails: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  reset: PropTypes.func,
};

export default propTypes;
