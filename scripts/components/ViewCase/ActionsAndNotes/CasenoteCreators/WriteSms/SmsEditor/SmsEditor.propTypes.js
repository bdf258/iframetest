import PropTypes from "prop-types";

export default {
  recipient: PropTypes.number,
  message: PropTypes.string,
  handleSendSms: PropTypes.func.isRequired,
};
