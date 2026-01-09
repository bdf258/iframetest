import propTypes from "prop-types";

export default {
  constituent: propTypes.shape({
    id: propTypes.number.isRequired,
  }).isRequired,
  emailID: propTypes.number.isRequired,
  onClickBack: propTypes.func.isRequired,
};
