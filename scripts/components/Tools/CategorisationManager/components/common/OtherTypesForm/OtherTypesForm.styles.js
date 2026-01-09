import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    border: "1px solid lightgrey",
    borderRadius: 8,
    padding: 8,
    margin: { bottom: 16 },
  },
  sectionHeading: {
    margin: { top: 8, bottom: 8 },
  },
  items: { display: "flex", flexWrap: "wrap" },
  noItems: { color: "grey" },
  modalWidth: { width: 500 },
  iconButton: {
    cursor: "pointer",
    height: 25,
    width: 25,
    "& *": {
      fill: "grey",
    },
    // button reset
    border: "none",
    padding: 0,
    margin: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
    boxShadow: "none",
  },
});

export default useStyles;
