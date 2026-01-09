import { createUseStyles } from "react-jss";
import modalStyles from "../../../../common/Modal/styles";

export const useStyles = createUseStyles({
  modalCard: modalStyles.positionBelowMainNav,
  FileActions: {
    width: 130,
    textAlign: "end",
  },
  iconButton: {
    cursor: "pointer",
    /* Button Reset */
    border: "none",
    margin: 0,
    padding: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },
  editButton: {
    cursor: "pointer",
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
  actionButton: {
    minWidth: 50,
  },
});
