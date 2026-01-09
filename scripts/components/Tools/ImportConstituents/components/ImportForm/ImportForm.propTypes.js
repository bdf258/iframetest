import PropTypes from "prop-types";

const propTypes = {
  formData: PropTypes.object,
  iln: PropTypes.object,
  onConfirm: PropTypes.func,
  resetForm: PropTypes.func,
  setFormData: PropTypes.func,
  valid: PropTypes.bool,
};

export default propTypes;
