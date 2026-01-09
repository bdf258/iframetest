import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
    margin: {
      top: 24,
    },
  },
  container: {
    width: 600,
  },
  spacing: {
    margin: { bottom: 8 },
  },
});
