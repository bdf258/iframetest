import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  table: { overflowX: "auto !important" },
  errorContainer: {
    textAlign: "center",
  },
  errorMsg: {
    color: "red",
  },
});

export default useStyles;
