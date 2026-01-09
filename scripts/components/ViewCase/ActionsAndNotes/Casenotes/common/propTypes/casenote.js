import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  subtypeID: PropTypes.number,
  timestamp: PropTypes.string,
  caseworkerID: PropTypes.number,
  caseID: PropTypes.number,
  note: PropTypes.string,
});
