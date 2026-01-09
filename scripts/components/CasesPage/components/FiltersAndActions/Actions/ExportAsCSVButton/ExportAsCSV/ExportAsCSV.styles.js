import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  exportAsCSV: {
    minWidth: 400,
    maxWidth: 600,
    maxHeight: "calc(100vh - 150px)",
    overflowY: "auto",
  },
});

export default useStyles;
