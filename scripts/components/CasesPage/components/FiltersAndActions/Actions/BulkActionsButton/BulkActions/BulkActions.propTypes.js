import PropTypes from "prop-types";
import statePropType from "../../../../../proptypes/statePropType";

const propTypes = {
  state: statePropType.isRequired,
  dispatch: PropTypes.func.isRequired,
  modalID: PropTypes.string.isRequired,
};

export default propTypes;
