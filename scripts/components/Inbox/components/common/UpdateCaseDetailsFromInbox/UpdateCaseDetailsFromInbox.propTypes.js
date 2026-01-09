import propTypes from "prop-types";

export default {
  closeModal: propTypes.func.isRequired,
  onModalClose: propTypes.func,
  inboxItem: propTypes.shape({
    id: propTypes.oneOfType([propTypes.string, propTypes.number]),
    caseID: propTypes.oneOfType([propTypes.string, propTypes.number]),
  }).isRequired,
};
