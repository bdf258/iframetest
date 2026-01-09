import PropTypes from "prop-types";

const propTypes = {
  caseDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    assignedTo: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    status: PropTypes.number.isRequired,
    restrictions: PropTypes.array.isRequired,
  }).isRequired,
  setCaseDetails: PropTypes.func.isRequired,
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ),
  closeModal: PropTypes.func,
  onMarkAsActioned: PropTypes.func,
};

export default propTypes;
