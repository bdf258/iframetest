import PropTypes from "prop-types";

export default {
  caseworkers: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    active: PropTypes.bool,
  }),
  doorknockingUsers: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caseworker_id: PropTypes.number.isRequired,
    survey_id: PropTypes.number.isRequired,
    active: PropTypes.bool,
  }),
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caseworker_id: PropTypes.number.isRequired,
    survey_id: PropTypes.number.isRequired,
    active: PropTypes.bool,
  }),
  onCancel: PropTypes.func.isRequired,
  saveDoorknockPermission: PropTypes.func,
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      voice: PropTypes.string.isRequired,
      surveyJSON: PropTypes.string.isRequired,
      visible: PropTypes.string.isRequired,
      adminOnly: PropTypes.string.isRequired,
    })
  ),
};
