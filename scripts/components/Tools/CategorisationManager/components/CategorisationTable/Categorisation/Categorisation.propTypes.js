import PropTypes from "prop-types";
import categoryPropType from "../../../propTypes/categoryPropType";

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: categoryPropType,
};

export default propTypes;
