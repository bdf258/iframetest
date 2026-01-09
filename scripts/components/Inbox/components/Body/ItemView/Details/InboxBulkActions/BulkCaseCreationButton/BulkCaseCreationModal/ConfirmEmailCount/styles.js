import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& > :last-child": {
      margin: {
        left: "2rem",
      },
    },
  },
  container: {
    width: 600,
  },
});
