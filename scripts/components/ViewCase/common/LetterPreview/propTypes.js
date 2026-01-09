import PropTypes from "prop-types";

const propTypes = {
  letterID: (props, propName) => {
    if (typeof props[propName] !== "number" && !props.pdfURL)
      return new Error(
        `${propName} must be a number or pdfURL must be defined`
      );
  },
  pdfURL: (props, propName) => {
    if (typeof props[propName] !== "string" && !props.letterID)
      return new Error(
        `${propName} must be a string or letterID must be defined`
      );
  },
  printOnMount: PropTypes.bool,
  handleLetterPrinted: PropTypes.func,
  showPrint: PropTypes.bool,
  showSave: PropTypes.bool,
  signed: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default propTypes;
