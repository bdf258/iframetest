import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  buttons: {
    display: "flex",
    marginTop: 8,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  button: {
    fontSize: "13.3px",
    color: "#363636",
  },
});
