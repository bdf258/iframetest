import PropTypes from "prop-types";

const propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  customClassNames: PropTypes.shape({
    placeholder: PropTypes.string,
    prependGroup: PropTypes.bool,
    container: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string,
    errorText: PropTypes.string,
    autoComplete: PropTypes.shape({
      input: PropTypes.string,
      container: PropTypes.string,
      dropDown: PropTypes.string,
    }),
  }),
};

export default propTypes;
