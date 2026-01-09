import PropTypes from "prop-types";
import { constituentPropType } from "../../../../types/Constituent";

const propTypes = {
  caseId: PropTypes.number.isRequired,
  constituent: constituentPropType,
  letterSaved: PropTypes.func.isRequired,
  sendViaEmail: PropTypes.func.isRequired,
  editorUnmounted: PropTypes.func.isRequired,
  caseDetails: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    category: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }),
};

export default propTypes;
