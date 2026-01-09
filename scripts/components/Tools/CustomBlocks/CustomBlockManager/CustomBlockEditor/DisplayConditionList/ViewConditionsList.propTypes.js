import {
  displayCondition,
  parent_object,
} from "../../propTypes/customBlock.propType";
import PropTypes from "prop-types";

export default {
  parent_object,
  display_conditions: displayCondition,
  onSaveNewConditionalBlock: PropTypes.func.isRequired,
  handleSaveConditionalBlock: PropTypes.func.isRequired,
};
