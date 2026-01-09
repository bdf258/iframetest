import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: { bottom: 10 },
    whiteSpace: "nowrap",
    "& > *": {
      margin: { bottom: 6 },
    },
  },
});

export default useStyles;
