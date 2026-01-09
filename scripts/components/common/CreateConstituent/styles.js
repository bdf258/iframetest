import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  inputGroup: {
    "& > *": {
      margin: {
        bottom: "0.5rem",
      },
    },
  },
  input: {
    margin: {
      top: 0,
      right: 0,
      left: 0,
      bottom: "0.5rem",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
