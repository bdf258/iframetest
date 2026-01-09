import PropTypes from "prop-types";
import categoryPropType from "../../propTypes/categoryPropType";

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    categorytypes: PropTypes.arrayOf(categoryPropType),
  }).isRequired,
};

export default propTypes;
