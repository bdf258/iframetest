import React from "react";
import propTypes from "./propTypes";

const UpArrowIcon = ({
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
        <path fill={colour} d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
      </svg>
    </div>
  );
};

UpArrowIcon.propTypes = propTypes;

export default UpArrowIcon;
