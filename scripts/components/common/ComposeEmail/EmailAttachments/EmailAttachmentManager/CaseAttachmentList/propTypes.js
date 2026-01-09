import PropTypes from "prop-types";

const propTypes = {
  addAttachment: PropTypes.func,
  attachments: PropTypes.array,
  icon: PropTypes.node,
  noAttachmentsText: PropTypes.string,
  titleText: PropTypes.string,
  type: PropTypes.oneOf(["emailAttachment", "letter", "file"]),
};

export default propTypes;
