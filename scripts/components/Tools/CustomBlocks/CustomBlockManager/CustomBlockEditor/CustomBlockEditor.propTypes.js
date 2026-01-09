import PropTypes from "prop-types";
import { customBlock } from "../propTypes/customBlock.propType";
export default {
  customBlocks: PropTypes.arrayOf(customBlock),
  selectedCustomBlock: customBlock,
  saveExistingCustomBlock: PropTypes.func.isRequired,
  saveNewCustomBlock: PropTypes.func.isRequired,
  cancelEditCustomBlock: PropTypes.func.isRequired,
};
