import PropTypes from "prop-types";
import { contactDetailsPropType } from "../MultiContactInput.propTypes";

const propTypes = {
  contactDetail: contactDetailsPropType,
  contactDetailsPropType: PropTypes.arrayOf(contactDetailsPropType),
  setContactDetails: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  disableButtons: PropTypes.bool.isRequired,
  setDisableButtons: PropTypes.func.isRequired,
  inputValidation: PropTypes.func,
  modifyInput: PropTypes.func,
};

export default propTypes;
