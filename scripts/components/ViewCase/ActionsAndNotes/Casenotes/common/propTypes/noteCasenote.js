import propTypes from "prop-types";

export default propTypes.shape({
  id: propTypes.number.isRequired,
  caseID: propTypes.number.isRequired,
  note: propTypes.string.isRequired,
});
