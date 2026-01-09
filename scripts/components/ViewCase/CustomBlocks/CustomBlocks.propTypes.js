import PropTypes from "prop-types";

export default {
  customClassNames: PropTypes.shape({
    input: PropTypes.string,
    container: PropTypes.string,
    inputWrapper: PropTypes.string,
    inputSpecificClasses: PropTypes.shape({
      date: PropTypes.shape({
        container: PropTypes.string,
      }),
    }),
  }),
};
