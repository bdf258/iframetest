import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  noMargin: {
    margin: 0,
  },
  buttonInputWrapper: {
    margin: { bottom: 7, right: "0.5%", left: "0.5%" },
    minWidth: 335,
    flex: 1,
    // button reset
    border: "none",
    padding: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
  detailsContainer: {
    margin: { left: -7 },
  },
  placeholderText: {
    color: "grey",
  },
});
