import PropTypes from "prop-types";
import { item } from "../../../../../../../proptypes/item";

export default {
  itemsActioned: PropTypes.func,
  itemsAssignedToCase: PropTypes.arrayOf(item),
  selectedItems: PropTypes.arrayOf(item),
};
