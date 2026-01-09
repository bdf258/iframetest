import propTypes from "prop-types";

export default {
  item: propTypes.shape({
    subject: propTypes.string,
    id: propTypes.number.isRequired,
  }).isRequired,
  modalID: propTypes.string.isRequired,
};
