import React from "react";
import propTypes from "prop-types";

const SMSIcon = ({ className, width = 56, height = 56 }) => (
  <svg
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    width={width}
    height={height}
    className={className}
  >
    <path
      fill="grey"
      d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"
    ></path>
  </svg>
);

SMSIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default SMSIcon;
