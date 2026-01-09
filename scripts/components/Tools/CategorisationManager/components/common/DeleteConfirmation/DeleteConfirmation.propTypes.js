import PropTypes from "prop-types";

const propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categorytype: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      statustype: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      casetype: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  modalID: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMerge: PropTypes.func,
  checkDeletionAllowed: PropTypes.func,
};

export default propTypes;
