import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  api: PropTypes.exact({
    login: PropTypes.func.isRequired,
    sso: PropTypes.func.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  clientId: PropTypes.string,
};

export default propTypes;
