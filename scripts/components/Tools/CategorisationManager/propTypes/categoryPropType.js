import PropTypes from "prop-types";

const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  categorytype: PropTypes.string.isRequired,
  reviewInDays: PropTypes.number.isRequired,
  restriction: PropTypes.exact({
    delete: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    manage: PropTypes.bool.isRequired,
    view: PropTypes.bool.isRequired,
  }).isRequired,
});

export default categoryPropType;
