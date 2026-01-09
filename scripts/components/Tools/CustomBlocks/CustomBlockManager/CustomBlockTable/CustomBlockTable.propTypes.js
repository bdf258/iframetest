import { PropTypes } from "prop-types";
import { customBlock } from "../propTypes/customBlock.propType";

export default {
  customBlocks: PropTypes.arrayOf(customBlock),
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
