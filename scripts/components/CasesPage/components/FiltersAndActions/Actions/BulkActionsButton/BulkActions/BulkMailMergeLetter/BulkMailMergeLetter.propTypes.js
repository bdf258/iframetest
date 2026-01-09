import PropTypes from "prop-types";
import statePropType from "../../../../../../proptypes/statePropType";

const propTypes = {
  onBackClick: PropTypes.func.isRequired,
  state: statePropType.isRequired,
};

export default propTypes;
