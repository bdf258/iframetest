import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  textSpacing: {
    margin: { bottom: "1rem" },
    textAlign: "center",
  },
  backButtonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    margin: {
      top: "1rem",
    },
  },
  textButton: {
    textDecoration: "underline",
    cursor: "pointer",
    margin: {
      top: 0,
      right: 0,
      bottom: "0.2rem",
      left: 0,
    },
    /* Button Reset */
    border: "none",
    padding: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
});
