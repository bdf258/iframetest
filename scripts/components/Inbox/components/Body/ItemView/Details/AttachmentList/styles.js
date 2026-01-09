import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  attachmentList: {
    display: "flex",
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
});
