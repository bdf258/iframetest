import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  details: {
    position: "sticky",
    top: 0,
    backgroundColor: "#FFF",
    zIndex: 10,
  },
  detailsContainer: {
    borderBottom: "1px solid #C6C6C6",
    padding: {
      top: "0.5rem",
      right: "1rem",
      bottom: "1rem",
      left: "1rem",
    },
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
});
