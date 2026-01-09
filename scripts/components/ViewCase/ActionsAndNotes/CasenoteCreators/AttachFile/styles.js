import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    margin: "0 auto",
    maxWidth: 600,
  },
  firstInputContainer: {
    margin: {
      top: 8,
      left: 0,
      right: 0,
      bottom: 8,
    },
  },
  inputContainer: {
    margin: { left: 0, right: 0, bottom: 8 },
  },
});
