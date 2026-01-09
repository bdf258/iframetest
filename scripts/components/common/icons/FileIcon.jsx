import React from "react";
import propTypes from "prop-types";

const FileIcon = ({ className, width = 56, height = 56 }) => (
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
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
    ></path>
  </svg>
);

FileIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default FileIcon;
