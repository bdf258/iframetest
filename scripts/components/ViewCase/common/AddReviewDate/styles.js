import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    margin: "0 auto",
    maxWidth: 600,
  },
  datePickerContainer: {
    margin: { left: 0, right: 0, bottom: 8 },
    flexGrow: "unset",
    flexBasis: "unset",
  },
  datePickerLabel: { minWidth: 90 },
  assignContainer: {
    margin: { left: 0, right: 0, bottom: 8 },
    flexGrow: "unset",
    flexBasis: "unset",
  },
  noteContainer: {
    margin: { left: 0, right: 0, bottom: 8 },
    height: "calc(100% - 180px)",
    minHeight: 130,
  },
});
