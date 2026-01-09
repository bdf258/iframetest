import PropTypes, { shape } from "prop-types";

export default {
  customClassNames: shape({
    label: PropTypes.string,
    container: PropTypes.string,
  }),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onUniqueName: PropTypes.func.isRequired,
};
