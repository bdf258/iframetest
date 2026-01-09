import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  buttonContainer: {
    textAlign: "center",
  },
  forgotPasswordContainer: {
    textAlign: "center",
    margin: { top: 10 },
  },
  spinner: {
    margin: { top: 8 },
  },
  textInputContainer: { flexBasis: "100%" },
  textInputInput: { margin: { bottom: 0 }, minWidth: 0 },
  languageSelectInputContainer: {
    marginTop: 15,
  },
});
