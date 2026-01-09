import PropTypes, { array } from "prop-types";

export const attachments = PropTypes.arrayOf(
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

export const addressField = PropTypes.shape({
  email: PropTypes.string,
  name: PropTypes.string,
});

export const emailItem = {
  caseID: PropTypes.number,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  to: PropTypes.arrayOf(addressField),
  cc: PropTypes.arrayOf(addressField),
  bcc: PropTypes.arrayOf(addressField),
  from: PropTypes.oneOfType([addressField, array]),
  subject: PropTypes.string.isRequired,
  plainBody: PropTypes.string,
  htmlBody: PropTypes.string,
  purifiedBody: PropTypes.string,
  dateTime: PropTypes.string,
  assignedTo: PropTypes.number.isRequired,
  attachments: attachments,
};
