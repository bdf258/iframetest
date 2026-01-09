import propTypes from "prop-types";

export default {
  inboxItem: propTypes.shape({
    subject: propTypes.string,
    id: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  }),

  modalID: propTypes.string.isRequired,
};
