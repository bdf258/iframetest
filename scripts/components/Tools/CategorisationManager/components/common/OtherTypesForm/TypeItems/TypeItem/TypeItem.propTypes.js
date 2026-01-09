import PropTypes from "prop-types";

const restriction = PropTypes.shape({
  edit: PropTypes.bool.isRequired,
  delete: PropTypes.bool.isRequired,
}).isRequired;

const propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.shape({ casetype: PropTypes.string, restriction }),
    PropTypes.shape({ statustype: PropTypes.string, restriction }),
  ]).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  typeKey: PropTypes.oneOf(["casetype", "statustype"]),
};

export default propTypes;
