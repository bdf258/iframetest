import { createUseStyles } from "react-jss";

const spacing = 16;

const useStyles = createUseStyles({
  heading: { margin: { bottom: spacing } },
  reviewCountButton: {
    cursor: "pointer",
    margin: { bottom: spacing },
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
  popoverText: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  popover: { width: "unset" },
  reviewDateList: {
    listStyleType: "none",
    textWrap: "nowrap",
    padding: 6,
    margin: 0,
    textAlign: "left",
  },
  nextReivewText: {
    margin: { bottom: spacing },
  },
  actionRow: { margin: { top: "auto" } },
  addReviewWrapper: {
    "& div:last-child": {
      margin: { top: "auto" },
    },
  },
});

export default useStyles;
