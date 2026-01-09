import propTypes from "prop-types";

export default {
  cases: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      caseType: propTypes.number.isRequired,
    })
  ),
  currentCaseID: propTypes.oneOfType([propTypes.number, propTypes.string]),
  value: propTypes.number,
  onChange: propTypes.func.isRequired,
};
