import PropTypes from "prop-types";
import { constituentPropType } from "../../../../types/Constituent";

const propTypes = {
  constituent: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    constituent: constituentPropType,
  }),
  precedence: PropTypes.number,
  setPrecedence: PropTypes.func,
};

export default propTypes;
