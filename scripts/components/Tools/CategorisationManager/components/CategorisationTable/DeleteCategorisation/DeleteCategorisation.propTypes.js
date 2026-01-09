import PropTypes from "prop-types";
import categoryPropType from "../../../propTypes/categoryPropType";

const propTypes = {
  categorisation: categoryPropType,
  state: PropTypes.shape({
    categorytypes: PropTypes.arrayOf(categoryPropType),
    statustypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        statustype: PropTypes.string.isRequired,
        restriction: PropTypes.shape({ view: PropTypes.bool.isRequired })
          .isRequired,
      })
    ),
    casetype: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        castype: PropTypes.string.isRequired,
        restriction: PropTypes.shape({ view: PropTypes.bool.isRequired })
          .isRequired,
      })
    ),
  }).isRequired,
};

export default propTypes;
