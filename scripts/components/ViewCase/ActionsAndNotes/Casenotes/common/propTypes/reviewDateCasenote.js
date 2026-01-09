import propTypes from "prop-types";

export default propTypes.shape({
  id: propTypes.number.isRequired,
  detail: propTypes.shape({
    id: propTypes.number.isRequired,
    reviewDate: propTypes.string.isRequired,
    completedOn: (props, propName, componentName) => {
      if (props[propName] === undefined)
        return new Error(
          `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is undefined`
        );
      else if (props[propName] !== null && typeof props[propName] !== "string")
        return new Error(
          `Invalid prop type supplied to \`${componentName}\`: \`${propName}\` should be string or null`
        );
    },
    completedBy: propTypes.number.isRequired,
    assignedTo: propTypes.number.isRequired,
    caseID: propTypes.number.isRequired,
    completed: propTypes.bool.isRequired,
    note: propTypes.string.isRequired,
  }).isRequired,
});
