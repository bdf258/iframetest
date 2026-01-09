import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  buttonBarContainer: {
    marginBottom: "-79px",
    marginRight: 5,
    "@media print": {
      display: "none",
    },
    "@container (max-width: 1125px)": {
      display: "none",
    },
  },
  buttonBarCollasped: {
    marginBottom: "-79px",
    marginRight: 5,
    display: "none",
    "@media print": {
      display: "none",
    },
    "@container (max-width: 1125px)": {
      display: "block",
    },
  },
});
