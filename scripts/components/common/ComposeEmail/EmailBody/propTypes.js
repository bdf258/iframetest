import PropTypes from "prop-types";

const propTypes = {
  dirty: PropTypes.func,
  emailBody: PropTypes.string.isRequired,
  emailInputsContainerRef: PropTypes.object,
  fromAddress: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  mergeCode: PropTypes.string,
  customClassNames: PropTypes.object,
  setBodyOutOfSync: PropTypes.func.isRequired,
  editorBottomOffset: PropTypes.number.isRequired,
  editorTopOffset: PropTypes.number.isRequired,
};

export default propTypes;
