import PropTypes from "prop-types";
import { item } from "../../../../../../../proptypes/item";

export default {
  itemsActioned: PropTypes.func,
  selectedItems: PropTypes.arrayOf(item),
};
