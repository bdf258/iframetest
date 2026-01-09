import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  constituentAndCase: {
    display: "flex",
  },
  caseAndChangeContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.2rem",
    fontSize: "0.9rem",
    flexWrap: "wrap",
  },
  label: {
    color: "rgb(54, 54, 54)",
    minWidth: 84,
    fontSize: "0.9rem",
    textAlign: "right",
    margin: {
      right: "0.6rem",
      bottom: "0.2rem",
    },
  },
  assignButton: {
    fontSize: "0.9rem",
    lineHeight: "18px",
  },
});
