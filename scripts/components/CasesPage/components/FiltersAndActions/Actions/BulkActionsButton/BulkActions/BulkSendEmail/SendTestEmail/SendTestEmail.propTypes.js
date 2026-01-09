import PropTypes from "prop-types";

const propTypes = {
  setView: PropTypes.func.isRequired,
  email: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default propTypes;
