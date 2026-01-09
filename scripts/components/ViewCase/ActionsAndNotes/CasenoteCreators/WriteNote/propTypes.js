import PropTypes from "prop-types";

const propTypes = {
  addCasenoteToState: PropTypes.func.isRequired,
  updateCasenote: PropTypes.func.isRequired,
  autoUpdateCasenote: PropTypes.func.isRequired,
  caseID: PropTypes.number.isRequired,
  existingNote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    subtypeID: PropTypes.number,
    timestamp: PropTypes.string,
    caseworkerID: PropTypes.number,
    caseID: PropTypes.number,
    note: PropTypes.string.isRequired,
  }),
};

export default propTypes;
