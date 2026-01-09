import PropTypes from "prop-types";

const ifNotOnCreateCaseOrCreateClick = (props) =>
  typeof props.onCreateCase === "undefined" &&
  typeof props.onCreateClick === "undefined";

const onCreateCasePropType = (props, propName, componentName) => {
  if (
    typeof props.onCreateCase !== "undefined" &&
    typeof props.constituentID === "undefined"
  )
    return new Error(
      `Invalid props passed to ${componentName}. 'onCreateCase' requires 'constituentID' to be defined.`
    );
  else if (
    props.onCreateCase !== undefined &&
    typeof props.onCreateCase !== "function"
  )
    return new Error(
      `Invalid prop 'onCreateCase' passed to ${componentName}. 'onCreateCase' must be a function.`
    );
  else if (ifNotOnCreateCaseOrCreateClick(props))
    return new Error(
      `Invalid props passed to ${componentName}. Either 'onCreateCase' or 'onCreateClick' must be a defined.`
    );
};

const onCreateClickPropType = (props, propName, componentName) => {
  if (
    props.onCreateClick !== undefined &&
    typeof props.onCreateClick !== "function"
  )
    return new Error(
      `Invalid prop 'onCreateClick' passed to ${componentName}. 'onCreateCase' must be a function.`
    );
  else if (ifNotOnCreateCaseOrCreateClick(props))
    return new Error(
      `Invalid props passed to ${componentName}. Either 'onCreateCase' or 'onCreateClick' must be a defined.`
    );
};

const propTypes = {
  caseworkers: PropTypes.arrayOf(PropTypes.object),
  onCreateCase: onCreateCasePropType,
  onCreateClick: onCreateClickPropType,
  createButtonText: PropTypes.node,
  onCancelClick: PropTypes.func,
  cancelButtonText: PropTypes.node,
  constituentID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default propTypes;
