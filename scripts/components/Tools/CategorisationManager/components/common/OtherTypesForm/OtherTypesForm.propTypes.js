import PropTypes from "prop-types";
import categoryPropType from "../../../propTypes/categoryPropType";

const propTypes = {
  types: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        casetype: PropTypes.string.isRequired,
        categorytypeID: PropTypes.number.isRequired,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        statustype: PropTypes.string.isRequired,
        categorytypeID: PropTypes.number.isRequired,
      })
    ),
    PropTypes.array,
    PropTypes.array,
  ]).isRequired,
  typeKey: PropTypes.oneOf(["casetype", "statustype"]).isRequired,
  modalIDs: PropTypes.shape({
    create: PropTypes.string.isRequired,
    edit: PropTypes.string.isRequired,
    delete: PropTypes.string,
  }).isRequired,
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  checkDeletionAllowed: PropTypes.func,
  category: PropTypes.oneOfType([
    categoryPropType,
    PropTypes.shape({
      categorytype: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default propTypes;
