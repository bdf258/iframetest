import PropTypes from "prop-types";

const propTypes = {
  caseID: PropTypes.number.isRequired,
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      caseType: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default propTypes;
