import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  caseActions: {
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  caseActionButtonContainer: {
    "@container (max-width: 1000px)": {
      display: "none",
    },
  },
  caseActionButtonContainerCollapse: {
    "@container (min-width: 1000px)": {
      display: "none",
    },
  },
});
