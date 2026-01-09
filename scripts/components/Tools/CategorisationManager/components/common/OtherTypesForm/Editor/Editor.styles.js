import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputContainer: { margin: { top: 0, left: 0, right: 0, bottom: 16 } },
  checkboxLabel: {
    padding: { left: 12 },
    fontSize: "0.9rem",
    cursor: ({ alreadyGlobal }) => alreadyGlobal && "not-allowed",
  },
  checkboxInput: {
    width: 18,
    minWidth: 18,
    maxWidth: 18,
    height: 18,
    minHeight: 18,
    maxHeight: 18,
    cursor: ({ alreadyGlobal }) => alreadyGlobal && "not-allowed",
    "& span": {
      fontSize: "2rem",
    },
  },
  confirmButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useStyles;
