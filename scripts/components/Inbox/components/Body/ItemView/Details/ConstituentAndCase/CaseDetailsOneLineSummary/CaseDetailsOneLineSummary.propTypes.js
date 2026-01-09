import PropTypes from "prop-types";

const propTypes = {
  caseID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default propTypes;
