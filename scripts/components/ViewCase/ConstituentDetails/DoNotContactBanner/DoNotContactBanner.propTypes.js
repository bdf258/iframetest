import PropTypes from "prop-types";

const propTypes = {
  selectedDoNotContacts: PropTypes.arrayOf(PropTypes.number).isRequired,
  doNotContactTypes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default propTypes;
