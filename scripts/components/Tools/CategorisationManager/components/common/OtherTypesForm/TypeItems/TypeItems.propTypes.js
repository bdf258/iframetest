import PropTypes from "prop-types";

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
  onEdit: PropTypes.func.isRequired,
  checkDeletionAllowed: PropTypes.func,
  heading: PropTypes.string,
};

export default propTypes;
