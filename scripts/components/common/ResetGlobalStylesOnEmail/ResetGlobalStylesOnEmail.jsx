import React from "react";
import propTypes from "./ResetglobalStylesOnEmail.propTypes";

// Global styles from the v3 style sheet are affecting the layout of emails when rendered.
// This component serves as a wrapper to apply legacy styles from the "#emailDiv" selector to remedy the issue.
// This component can be removed from the code base once the global styles are removed.

const ResetGlobalStylesOnEmail = ({ children }) => {
  return <div className={"emailContentStyler"}>{children}</div>;
};

ResetGlobalStylesOnEmail.propTypes = propTypes;
export default ResetGlobalStylesOnEmail;
