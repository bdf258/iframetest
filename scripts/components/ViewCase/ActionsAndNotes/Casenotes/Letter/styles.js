import { createUseStyles } from "react-jss";
import modalStyles from "../../../../common/Modal/styles";

export const useStyles = createUseStyles({
  listItem: {
    marginTop: 5,
  },
  modalCard: modalStyles.positionBelowMainNav,
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
  pencilIcon: {
    color: "#363637",
    verticalAlign: "bottom",
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
  letterReferenceContainer: {
    marginBottom: "8px",
  },
  actionButton: {
    minWidth: 50,
  },
});
