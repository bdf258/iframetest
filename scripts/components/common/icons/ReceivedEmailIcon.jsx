import React from "react";
import propTypes from "prop-types";

const ReceivedEmailIcon = ({ className, width = 56, height = 56 }) => (
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
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
    ></path>
  </svg>
);

ReceivedEmailIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default ReceivedEmailIcon;
