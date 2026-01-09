import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  label: {
    width: 170,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  inputContainer: {
    margin: { top: 0, left: 0, right: 0, bottom: 5 },
  },
  caseFieldInput: {
    width: 200,
  },
});
