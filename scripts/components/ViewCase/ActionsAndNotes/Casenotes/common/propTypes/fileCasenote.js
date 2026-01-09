import propTypes from "prop-types";

export default propTypes.shape({
  id: propTypes.number.isRequired,
  note: propTypes.string,
  detail: propTypes.shape({
    id: propTypes.number.isRequired,
    reference: propTypes.string.isRequired,
    originalFileName: propTypes.string.isRequired,
  }).isRequired,
});
