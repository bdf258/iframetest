import PropTypes from "prop-types";

const propTypes = {
  attachmentUploaded: PropTypes.func,
  emailId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  emailSaved: PropTypes.func,
  modalId: PropTypes.string.isRequired,
  saveDraft: PropTypes.func,
  setAttachmentPayload: PropTypes.func,
  type: PropTypes.oneOf(["email", "bulkEmail"]),
};

export default propTypes;
