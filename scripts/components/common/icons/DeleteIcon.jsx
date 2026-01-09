import React from "react";
import propTypes from "prop-types";

const DeleteIcon = ({
  className,
  width = 56,
  height = 56,
  colour = "lightgrey",
  ...props
}) => {
  return (
    <svg
      fill={colour}
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
  );
};

DeleteIcon.propTypes = {
  className: propTypes.string,
  colour: propTypes.string,
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

export default DeleteIcon;
