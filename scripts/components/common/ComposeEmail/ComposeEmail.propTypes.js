import { EmailPropType } from "../../../types/Email";
import PropTypes from "prop-types";
import { constituentPropType } from "../../../types/Constituent";

const propTypes = {
  caseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  constituent: constituentPropType,
  email: EmailPropType,
  emailSaved: PropTypes.func.isRequired,
  emailSent: PropTypes.func.isRequired,
  forwardedEmail: PropTypes.bool,
  unmounted: PropTypes.func,
  additionalMergeCodes: PropTypes.arrayOf(
    PropTypes.shape({
      mergeCode: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  recipient: PropTypes.shape({
    email: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          value: PropTypes.string,
        }),
        PropTypes.string,
      ])
    ),
    firstName: PropTypes.string,
    surname: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default propTypes;
