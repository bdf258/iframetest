import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputContainer: { margin: { top: 0, right: 0, bottom: 16, left: 0 } },
  confirmButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useStyles;
