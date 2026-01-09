import { PropTypes } from "prop-types";

export default {
  handleConfirmDeleteCustomBlock: PropTypes.func.isRequired,
  customBlockName: PropTypes.string.isRequired,
  customBlockId: PropTypes.number.isRequired,
  parent_object: PropTypes.string.isRequired,
};
