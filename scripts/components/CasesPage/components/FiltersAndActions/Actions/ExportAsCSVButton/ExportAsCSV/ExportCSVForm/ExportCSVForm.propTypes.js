import PropTypes from "prop-types";
import optionsPropType from "../proptypes/optionsPropType";
import statePropType from "../../../../../../proptypes/statePropType";

const propTypes = {
  options: optionsPropType.isRequired,
  setOptions: PropTypes.func.isRequired,
  state: statePropType.isRequired,
};

export default propTypes;
