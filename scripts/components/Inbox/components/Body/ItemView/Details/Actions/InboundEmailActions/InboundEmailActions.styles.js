import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  actions: {
    maxWidth: 300,
    display: "flex",
    justifyContent: "flex-end",
    alignContent: "space-between",
    flexWrap: "wrap",
    height: "calc(100% - 21px)",
  },
});
