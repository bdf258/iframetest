import PropTypes from "prop-types";

const propTypes = {
  existingReview: PropTypes.shape({
    id: PropTypes.number,
    caseworkerID: PropTypes.number,
    timestamp: PropTypes.string,
    type: PropTypes.string,
    detail: PropTypes.shape({
      id: PropTypes.number,
      assignedTo: PropTypes.number.isRequired,
      completed: PropTypes.bool,
      completedBy: PropTypes.number,
      completedOn: PropTypes.string,
      reviewDate: PropTypes.string.isRequired,
      note: PropTypes.string,
    }).isRequired,
  }),
  index: PropTypes.number,
  onCreation: PropTypes.func,
  onUpdate: PropTypes.func,
  onBackClick: PropTypes.func,
  backButtonText: PropTypes.string,
  buttonSize: PropTypes.oneOf(["small", "large"]),
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ),
};

export default propTypes;
