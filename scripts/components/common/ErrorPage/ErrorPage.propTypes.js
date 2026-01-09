import PropTypes from "prop-types";

export default {
  statusCode: PropTypes.string,
  errorDetails: PropTypes.exact({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    message: PropTypes.string,
  }),
};
