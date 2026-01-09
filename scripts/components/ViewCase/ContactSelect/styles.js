import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    margin: "0 auto",
    maxWidth: 600,
  },
  inputContainer: {
    margin: {
      bottom: "0.5em",
      left: 0,
      right: 0,
    },
  },
  label: { minWidth: 125 },
  inputSpaceBelow: {
    marginBottom: 20,
  },
});
