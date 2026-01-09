import PropTypes from "prop-types";
import casenote from "../common/propTypes/casenote";

const propTypes = {
  casenote: casenote.isRequired,
  confirmMessage: PropTypes.node,
  confirmationValue: PropTypes.string,
  failureMessage: PropTypes.node.isRequired,
  index: PropTypes.number,
  modalID: PropTypes.string.isRequired,
  modifyInputValues: PropTypes.func,
  removeCasenote: PropTypes.func.isRequired,
  successMessage: PropTypes.node.isRequired,
};

export default propTypes;
