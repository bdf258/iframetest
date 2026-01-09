import PropTypes from "prop-types";
import { filtersPropTypes } from "../../../../../../../proptypes/statePropType";

const propTypes = {
  recipientCount: PropTypes.number.isRequired,
  email: PropTypes.shape({
    body: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  }),
  setEmail: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  refreshResults: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  filters: filtersPropTypes,
  attachments: PropTypes.any,
  setAttachments: PropTypes.func.isRequired,
  attachmentPayload: PropTypes.shape({
    attachment: PropTypes.shape({
      type: PropTypes.string.isRequired,
      file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    }),
  }),
  setAttachmentPayload: PropTypes.func.isRequired,
  additionalMergeCodes: PropTypes.arrayOf(
    PropTypes.shape({
      mergeCode: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  onBackClick: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
};

export default propTypes;
