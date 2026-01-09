import React from "react";
import propTypes from "./propTypes";
const ForwardIcon = ({ width = 100, height = 100, colour = "lightgrey" }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={colour}
        d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
      ></path>
    </svg>
  );
};

ForwardIcon.propTypes = propTypes;

export default ForwardIcon;
