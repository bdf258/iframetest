import { createUseStyles } from "react-jss";
import emailSendStyles from "../common/styles";
import modalStyles from "../../Modal/styles";

export const useStyles = createUseStyles({
  buttonBar: emailSendStyles.inputButtonContainer,
  attachmentOptionsButton: {
    display: "block",
    marginBottom: 5,
  },
  inputButton: {
    ...emailSendStyles.inputButton,
    whiteSpace: "nowrap",
  },
  modalCard: { ...modalStyles.positionBelowMainNav, minWidth: 600 },
  hideInput: {
    display: "none",
  },
});
