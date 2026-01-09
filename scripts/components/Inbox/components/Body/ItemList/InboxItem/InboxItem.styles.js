import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  date: {
    marginLeft: "auto",
    whiteSpace: "nowrap",
    fontSize: "0.675rem",
  },
  item: {
    borderBottom: "1px solid #ededed",
    cursor: "pointer",
  },
  checkboxButton: {
    textAlign: "center",
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    /* Button Reset */
    border: "none",
    margin: 0,
    padding: 0,
    overflow: "visible",
    font: "inherit",
    background: "transparent",
    color: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
  checkboxInput: {
    pointerEvents: "none",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
  },
  itemContentContainer: {
    padding: "10px 10px 10px 0",
    width: "100%",
    wordBreak: "break-all",
  },
  attachmentIconContainer: {
    width: 15,
    marginRight: 5,
  },
  attachmentIcon: {
    transform: "rotate(45deg)",
  },
  summary: {
    color: "#878787",
  },
  selected: {
    background: "#cccccc",
  },

  focused: {
    backgroundColor: "#eaeaea",
  },
});
