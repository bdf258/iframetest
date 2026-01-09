import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  label: {
    minWidth: 170,
  },
  inputContainer: {
    margin: { top: 0, left: 0, right: 0, bottom: 5 },
  },
  inputDisabled: {
    "&:disabled": {
      color: "#BDBDBD !important",
      WebkitTextFillColor: "#BDBDBD !important",
    },
  },
});
