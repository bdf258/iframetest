import PropTypes from "prop-types";

export const contactDetailsPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string.isRequired,
  primary: PropTypes.bool.isRequired,
}).isRequired;

const propTypes = {
  contactDetailName: PropTypes.string.isRequired,
  contactDetailTypeID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  contactDetails: PropTypes.arrayOf(contactDetailsPropType),
  setContactDetails: PropTypes.func.isRequired,
  constituentID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  source: PropTypes.string.isRequired,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  inputValidation: PropTypes.func,
  modifyInput: PropTypes.func,
  label: PropTypes.string,
};

export default propTypes;
