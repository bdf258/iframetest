import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  headingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: { margin: { top: 10, right: 0, bottom: 10, left: 0 } },
  button: { fontSize: "inherit" },
});

export default useStyles;
