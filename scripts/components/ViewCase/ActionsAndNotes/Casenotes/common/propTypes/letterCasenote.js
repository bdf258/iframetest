import propTypes from "prop-types";

export default propTypes.shape({
  id: propTypes.number.isRequired,
  detail: propTypes.shape({
    id: propTypes.number.isRequired,
    reference: propTypes.string.isRequired,
    created: propTypes.string.isRequired,
    updated: propTypes.string.isRequired,
  }).isRequired,
});
