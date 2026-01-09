import PropTypes from "prop-types";

const propTypes = {
  onModalClose: PropTypes.func,
  closeModal: PropTypes.func,
  caseworkers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    })
  ),
  casenotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCasenote: PropTypes.func.isRequired,
  updateCasenoteByID: PropTypes.func.isRequired,
  caseDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    assignedTo: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    status: PropTypes.number.isRequired,
    restrictions: PropTypes.array.isRequired,
  }).isRequired,
  setCaseDetails: PropTypes.func.isRequired,
  onMarkAsActioned: PropTypes.func,
};

export default propTypes;
