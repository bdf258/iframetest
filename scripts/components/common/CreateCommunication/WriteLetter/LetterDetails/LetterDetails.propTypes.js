import PropTypes from "prop-types";

const propTypes = {
  onLetterDetailsChange: PropTypes.func.isRequired,
  letterDetails: PropTypes.exact({
    addressedTo: PropTypes.string.isRequired,
    letterheadId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    letterTemplateId: PropTypes.number,
    letterRef: PropTypes.string,
    letterTemplateName: PropTypes.string,
  }),
};

export default propTypes;
