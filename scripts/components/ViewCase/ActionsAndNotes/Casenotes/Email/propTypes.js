import { EmailPropType } from "../../../../../types/Email";
import PropTypes from "prop-types";

const propTypes = {
  casenote: EmailPropType,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default propTypes;
