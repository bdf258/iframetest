import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  textareaContainer: {
    marginTop: 8,
    height: "calc(100% - 87px)",
    resize: "none",
  },
  textareaInput: {
    height: "100%",
    overflowY: "auto",
  },
  saveRow: {
    height: "unset",
  },
});
