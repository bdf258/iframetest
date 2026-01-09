import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputGroup: {
    "& > *": {
      margin: {
        bottom: "0.5rem",
      },
    },
  },
  inputContainer: {
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

export default useStyles;
