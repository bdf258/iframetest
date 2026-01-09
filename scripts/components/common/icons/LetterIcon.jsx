import React from "react";
import propTypes from "prop-types";

const LetterIcon = ({ className, width = 56, height = 56 }) => (
  <svg
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="grey"
    width={width}
    height={height}
    className={className}
  >
    <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
  </svg>
);

LetterIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default LetterIcon;
