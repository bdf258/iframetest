import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    marginTop: 24,
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

export default useStyles;
