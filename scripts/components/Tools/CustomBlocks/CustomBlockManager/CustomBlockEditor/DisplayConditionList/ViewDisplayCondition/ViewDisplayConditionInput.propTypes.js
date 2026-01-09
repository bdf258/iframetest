import PropTypes from "prop-types";
import { displayConditionForView } from "../../../propTypes/displayConditionsForView.propTypes";
export default {
  handleAddCondition: PropTypes.func.isRequired,
  handleRemoveConditionalBlock: PropTypes.func.isRequired,
  handleSaveConditionalBlock: PropTypes.func.isRequired,
  displayCondition: displayConditionForView,
};
