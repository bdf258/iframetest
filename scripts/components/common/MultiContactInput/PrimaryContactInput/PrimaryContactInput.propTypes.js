import PropTypes from "prop-types";

const propTypes = {
  customClassNames: PropTypes.shape({
    container: PropTypes.string,
  }),
  contactDetails: PropTypes.array.isRequired,
  setContactDetails: PropTypes.func.isRequired,
  contactDetailName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  contactDetailTypeID: PropTypes.number.isRequired,
  constituentID: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  source: PropTypes.string.isRequired,
  modifyInput: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setFocused: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default propTypes;
