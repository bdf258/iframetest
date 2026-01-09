import PropTypes from "prop-types";
import emailAttachment from "../common/propTypes/emailAttachment";

const propTypes = {
  currentAttachments: PropTypes.arrayOf(PropTypes.shape(emailAttachment)),
  handleDeleteAttachment: PropTypes.func.isRequired,
  uploadingAttachment: PropTypes.bool.isRequired,
};

export default propTypes;
