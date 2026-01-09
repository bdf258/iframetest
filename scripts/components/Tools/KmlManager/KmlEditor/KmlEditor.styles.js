import { createUseStyles } from "react-jss";

const inputBottomMargin = 16;

const useStyles = createUseStyles({
  kmlEditor: {
    width: 600,
  },
  inputContainer: {
    margin: { top: 0, right: 0, bottom: inputBottomMargin, left: 0 },
  },
  fileInputContainer: { margin: { top: 0, right: 0, bottom: 0, left: 0 } },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chipInputPlaceholder: { margin: { bottom: inputBottomMargin } },
});

export default useStyles;
