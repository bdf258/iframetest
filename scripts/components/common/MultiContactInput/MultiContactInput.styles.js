import { createUseStyles } from "react-jss";

const spacing = 8;

const useStyles = createUseStyles({
  multiContactInput: {
    width: "100%",
    "& > span": {
      display: "block",
      "& > span": {
        width: "100%",
      },
    },
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    margin: 0,
    borderRadius: (theme) => theme.inputs.borderRadius,
    fontSize: "0.9em",
  },
  primaryText: {
    padding: { top: 0, right: 0, bottom: 0, left: spacing },
  },
  arrow: {
    position: "absolute",
    right: 8,
  },
  placeholderText: { color: "#909090" },
  inputLabel: { padding: { top: 0, right: spacing, bottom: 0, left: spacing } },
});

export default useStyles;
