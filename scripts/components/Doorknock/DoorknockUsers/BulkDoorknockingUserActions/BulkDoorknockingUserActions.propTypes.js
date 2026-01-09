import PropTypes from "prop-types";

export default {
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      visible: PropTypes.string.isRequired,
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      caseworker_id: PropTypes.number.isRequired,
      survey_id: PropTypes.number.isRequired,
      active: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
