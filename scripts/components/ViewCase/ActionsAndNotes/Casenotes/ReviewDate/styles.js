import { createUseStyles } from "react-jss";
import modalStyles from "../../../../common/Modal/styles";

export const useStyles = createUseStyles({
  inputContainer: {
    margin: { left: 0, right: 0, bottom: 7 },
  },
  modalCard: modalStyles.positionBelowMainNav,
  buttonSpacing: {
    margin: { bottom: 7 },
  },
  reviewActions: {
    width: 130,
    textAlign: "end",
  },
  reviewMain: {
    display: "flex",
    flexWrap: "wrap",
  },
  reviewNote: {
    whiteSpace: "break-spaces",
    flexGrow: 10,
    backgroundColor: "#F6F6F6",
    border: "1px solid #c0c0c0",
    padding: 8,
    margin: { right: 8, bottom: 7 },
  },
  reviewDetails: {
    flexGrow: 1,
    minWidth: "20%",
    margin: { right: 8 },
  },
  saveCancelButtons: {
    textAlign: "right",
    margin: {
      top: 4,
    },
  },
  saveButton: {
    margin: {
      left: 16,
    },
  },
  actionButton: {
    minWidth: 50,
  },
});
