import PropTypes from "prop-types";
import statePropType from "../../../../proptypes/statePropType";

const propTypes = {
  sortByName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  state: statePropType.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default propTypes;
