import PropTypes from "prop-types";

const EmailAttachmentsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    emailId: PropTypes.number,
    fileName: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    size: PropTypes.number,
    path: PropTypes.string,
  })
);

const EmailAddressField = PropTypes.shape({
  email: PropTypes.string,
  name: PropTypes.string,
});

const EmailPropType = PropTypes.shape({
  emailID: PropTypes.number,
  to: PropTypes.arrayOf(EmailAddressField),
  cc: PropTypes.arrayOf(EmailAddressField),
  bcc: PropTypes.arrayOf(EmailAddressField),
  subject: PropTypes.string,
  purifiedBody: PropTypes.string,
  body: PropTypes.string,
  from: EmailAddressField,
  attachments: EmailAttachmentsPropType,
});

export { EmailAttachmentsPropType, EmailPropType };
