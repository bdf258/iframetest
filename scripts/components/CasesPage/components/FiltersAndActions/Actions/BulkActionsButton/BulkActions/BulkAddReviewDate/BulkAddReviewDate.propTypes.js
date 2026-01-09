import PropTypes from "prop-types";
import statePropType from "../../../../../../proptypes/statePropType";

const propTypes = {
  onBackClick: PropTypes.func.isRequired,
  refreshResults: PropTypes.func.isRequired,
  state: statePropType.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default propTypes;
