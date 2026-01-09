import PropTypes from "prop-types";

const oneRequiredString = (props, propName, componentName) => {
  const { fileName, label } = props;

  if (!fileName && !label) {
    return new Error(
      `One of 'fileName' or 'label' is required in '${componentName}'.`
    );
  }

  if (fileName && typeof fileName !== "string") {
    return new Error(`'fileName' in '${componentName}' must be a string.`);
  }

  if (label && typeof label !== "string") {
    return new Error(`'label' in '${componentName}' must be a string.`);
  }

  return null;
};

const propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.number,
    mimeType: PropTypes.string,
    fileName: oneRequiredString,
    label: oneRequiredString,
  }),
  fileID: PropTypes.number,
};

export default propTypes;
