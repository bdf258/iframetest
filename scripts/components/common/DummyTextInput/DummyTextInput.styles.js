import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    margin: { left: 0, right: 0 },
    fontSize: "0.9rem",
    fontWeight: 400,
    overflowX: "hidden",
  },
  value: {
    padding: { left: 8, right: 8 },
    color: "#363636",
  },
});

export default useStyles;
