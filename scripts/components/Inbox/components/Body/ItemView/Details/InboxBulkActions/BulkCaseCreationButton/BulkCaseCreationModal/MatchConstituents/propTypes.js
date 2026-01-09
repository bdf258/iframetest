import { item } from "../../../../../../../../proptypes/item";
import propTypes from "prop-types";

export default {
  emails: propTypes.arrayOf(item),
  onComplete: propTypes.func.isRequired,
};
