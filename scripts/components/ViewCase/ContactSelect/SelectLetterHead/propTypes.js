import PropTypes from "prop-types";

const propTypes = {
  letterheadTemplates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.number,
  customClassNames: PropTypes.object,
};

export default propTypes;
