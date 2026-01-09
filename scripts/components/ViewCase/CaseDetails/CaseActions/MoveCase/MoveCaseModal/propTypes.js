import PropTypes from "prop-types";

const propTypes = {
  modalID: PropTypes.string.isRequired,
  caseID: PropTypes.number.isRequired,
  constituentID: PropTypes.number.isRequired,
  setCaseConstituent: PropTypes.func.isRequired,
};

export default propTypes;
