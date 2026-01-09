import React from "react";
import propTypes from "./propTypes";

const DownArrowIcon = ({
  width = 100,
  height = 100,
  colour = "white",
  backgroundColour = "lightgrey",
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "100%",
        backgroundColor: backgroundColour,
      }}
    >
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path fill={colour} d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>
  );
};

DownArrowIcon.propTypes = propTypes;

export default DownArrowIcon;
