import PropTypes from "prop-types";

export default {
  caseWithEditPermissions: PropTypes.shape({
    caseType: PropTypes.number,
    id: PropTypes.number,
    restrictions: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
    userPermissions: PropTypes.shape({
      delete: PropTypes.bool,
      edit: PropTypes.bool,
      manager: PropTypes.bool,
      view: PropTypes.bool,
    }),
  }),
  collapse: PropTypes.bool.isRequired,
};
