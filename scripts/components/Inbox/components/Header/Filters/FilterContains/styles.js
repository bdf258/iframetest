import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  ContainsInputWrapper: {
    minWidth: 175,
    display: "inherit",
    alignItems: "inherit",
    flexGrow: 1,
  },
  label: { margin: { right: 8 } },
  formSelectContainer: {
    margin: 0,
  },
});
