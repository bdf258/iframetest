import PropTypes from "prop-types";
import { contactDetailsPropType } from "../MultiContactInput.propTypes";

const propTypes = {
  contactDetails: PropTypes.arrayOf(contactDetailsPropType).isRequired,
  setContactDetails: PropTypes.func.isRequired,
  contactDetailName: PropTypes.string.isRequired,
  newContact: contactDetailsPropType,
};

export default propTypes;
