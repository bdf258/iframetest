import PropTypes from "prop-types";

const propTypes = {
  addReviewFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  caseDetails: PropTypes.object,
  keepExistingContactDetails: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  noOfConstituents: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default propTypes;
