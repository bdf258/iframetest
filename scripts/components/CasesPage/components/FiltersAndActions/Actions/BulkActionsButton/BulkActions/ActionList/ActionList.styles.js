import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  actionList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& button": {
      margin: { bottom: 4 },
    },
  },
  dangerZone: {
    color: "red",
  },
});

export default useStyles;
