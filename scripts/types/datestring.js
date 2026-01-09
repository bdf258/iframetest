export default (props, propName, componentName) => {
  if (props[propName]) {
    if (typeof props[propName] !== "string") {
      return new Error(
        "Invalid prop " +
          "`" +
          propName +
          "`" +
          " of type " +
          "`" +
          typeof props[propName] +
          "`" +
          " supplied to" +
          " `" +
          componentName +
          "`" +
          ". Expected datestring."
      );
    } else if (isNaN(new Date(props[propName]).getTime())) {
      return new Error(
        "Invalid prop " +
          "`" +
          propName +
          "`" +
          " supplied to" +
          " `" +
          componentName +
          "`. The provided string failed to create a valid date object."
      );
    }
  }
};
