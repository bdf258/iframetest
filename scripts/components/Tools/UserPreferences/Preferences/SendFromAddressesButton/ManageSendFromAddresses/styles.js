import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modal: {
    width: ({ theme }) => theme.modal.width.medium,
  },
  tableRow: { cursor: "move" },
  tableCell: {
    verticalAlign: "middle",
    textAlign: "center",
  },
  draggedRow: {
    border: "2px dashed #cbd5e0",
    outline: "2px dashed #cbd5e0",
    opacity: 0.01, // makes the row "invisible but still appears for drag"
  },
  hidden: {
    opacity: 0.0,
  },
  buttonReset: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    // button reset
    border: "none",
    overflow: "visible",
    color: "inherit",
    font: "inherit",
    background: "transparent",
    lineHeight: "normal",
    outline: "none",
  },
});

export default useStyles;
