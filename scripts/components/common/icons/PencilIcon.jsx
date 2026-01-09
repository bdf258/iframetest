import React from "react";
import propTypes from "prop-types";

const PencilIcon = ({ className, width = 56, height = 56 }) => {
  return (
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
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      ></path>
    </svg>
  );
};

PencilIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default PencilIcon;
