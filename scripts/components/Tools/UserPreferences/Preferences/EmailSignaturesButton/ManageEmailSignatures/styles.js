import { createUseStyles } from "react-jss";

const borderStyles = "#EFEFEF solid 1px";

const useStyles = createUseStyles({
  editModal: { width: (theme) => theme.modal.width.xLarge },
  successModal: { width: (theme) => theme.modal.width.small },
  emailColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    wordBreak: "break-word",
  },
  ckeditorContainer: {
    minWidth: 650,
  },
  button: {
    cursor: "pointer",
    padding: 8,
    textAlign: "left",
    borderBottom: borderStyles,
    borderLeft: borderStyles,
    // button reset
    border: "none",
    overflow: "visible",
    color: "inherit",
    font: "inherit",
    background: "transparent",
    lineHeight: "normal",
    outline: "none",
  },
  firstButton: { borderTop: borderStyles },
  selected: {
    backgroundColor: "#C4C4C4",
  },
});

export default useStyles;
