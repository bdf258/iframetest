import React from "react";
import propTypes from "prop-types";

const DraftEmailIcon = ({ className, width = 56, height = 56 }) => (
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
      d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"
    ></path>
  </svg>
);

DraftEmailIcon.propTypes = {
  className: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default DraftEmailIcon;
