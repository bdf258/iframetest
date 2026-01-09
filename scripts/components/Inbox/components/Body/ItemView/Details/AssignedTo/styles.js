import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  assignedTo: {
    display: "flex",
    alignItems: "center",
    margin: { bottom: "0.2rem" },
  },
  assignedSelectWrapper: { minWidth: 300 },
  label: {
    color: "rgb(54, 54, 54)",
    fontSize: "0.9rem",
    margin: {
      right: "0.6rem",
    },
  },
});
