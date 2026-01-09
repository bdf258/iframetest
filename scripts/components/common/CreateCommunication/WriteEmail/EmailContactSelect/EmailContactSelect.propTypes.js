import PropTypes from "prop-types";
import { constituentPropType } from "../../../../../types/Constituent";

const propTypes = {
  constituent: constituentPropType,
  onContactSelect: PropTypes.func.isRequired,
  contactType: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default propTypes;
