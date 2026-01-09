import ContactTypeListPropTypes from "../types/ContactTypeList.propTypes";
import PropTypes from "prop-types";
import { constituentPropType } from "../../../../types/Constituent";

const propTypes = {
  caseId: PropTypes.number.isRequired,
  constituent: constituentPropType,
  contactTypes: ContactTypeListPropTypes,
  emailSent: PropTypes.func.isRequired,
  emailSaved: PropTypes.func.isRequired,
  editorUnmounted: PropTypes.func,
  forwardedEmail: PropTypes.bool,
  customFieldValues: PropTypes.shape({
    [PropTypes.number]: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  caseDetails: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    category: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }),
};

export default propTypes;
