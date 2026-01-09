import PropTypes from "prop-types";
import emailAttachment from "./common/propTypes/emailAttachment";

const propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.shape(emailAttachment)),
  caseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  emailId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalId: PropTypes.string.isRequired,
  saveDraft: PropTypes.func.isRequired,
  updateAttachments: PropTypes.func.isRequired,
};

export default propTypes;
