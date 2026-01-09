import PropTypes from "prop-types";

const propTypes = {
  onContactSelect: PropTypes.func.isRequired,
  contactType: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default propTypes;
