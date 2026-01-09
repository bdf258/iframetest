import PropTypes from "prop-types";

const propTypes = {
  handleOnBack: PropTypes.func.isRequired,
  recipientCount: PropTypes.number.isRequired,
  email: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default propTypes;
