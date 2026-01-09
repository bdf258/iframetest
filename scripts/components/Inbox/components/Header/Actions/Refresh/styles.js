import { createUseStyles } from "react-jss";

const normalSpin = {
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
};

export const useStyles = createUseStyles({
  "@keyframes normalSpin": normalSpin,
  inputContainer: {
    margin: 0,
    flexBasis: "unset",
    flexGrow: "unset",
    borderRadius: 4,
  },
  spin: {
    animationName: "$normalSpin", // Reference the keyframes
    animationDuration: "0.5s", // Total duration of the animation
    animationIterationCount: "infinite", // Repeat indefinitely
    animationFillMode: "both", // Maintain the final state when not animating
    // You can add other animation properties here like delay, direction, etc.
  },
  refreshButton: {
    width: 45,
    height: 30,
    fontWeight: 400,
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    background: "white",
    /* Button Reset */
    border: "none",
    margin: 0,
    overflow: "visible",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
});
