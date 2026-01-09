import EmailInput from "../propTypes/EmailInput";
import PropTypes from "prop-types";

const propTypes = {
  caseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customClassNames: PropTypes.object,
  emailId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  emailSaved: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  saveDraft: PropTypes.func.isRequired,
  value: EmailInput,
};

export default propTypes;
