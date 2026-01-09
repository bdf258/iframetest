import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  dropFilesToInbox: { position: "relative", width: "100%", height: "100%" },
  fileDropTarget: { width: "100%", height: "100%" },
  closeButton: {
    position: "absolute",
    top: "0px",
    right: "3px",
    cursor: "pointer",
    fontSize: "20px",
    color: "grey",
    /* Button Reset */
    border: "none",
    margin: 0,
    padding: 0,
    overflow: "visible",
    background: "transparent",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
});
