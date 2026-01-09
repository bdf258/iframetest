import PropTypes from "prop-types";

const propTypes = {
  contactTypeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  question: PropTypes.string.isRequired,
  onContactSelect: PropTypes.func.isRequired,
  dataSource: PropTypes.func.isRequired,
};

export default propTypes;
