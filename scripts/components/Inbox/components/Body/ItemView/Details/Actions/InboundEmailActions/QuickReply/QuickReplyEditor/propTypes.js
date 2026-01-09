import { EmailPropType } from "../../../../../../../../../../types/Email";
import propTypes from "prop-types";

export default {
  email: EmailPropType,
  onEmailSend: propTypes.func.isRequired,
};
