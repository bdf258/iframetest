import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  typesMapper: {
    margin: { bottom: 16 },
    display: "flex",
    flexDirection: "column",
  },
  row: { display: "flex", alignItems: "center" },
  name: { flexGrow: 1 },
});

export default useStyles;
