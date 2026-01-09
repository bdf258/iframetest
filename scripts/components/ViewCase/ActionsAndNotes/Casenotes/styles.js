import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  casenotesFetching: {
    display: "flex",
    justifyContent: "center",
    margin: { bottom: 24 },
  },
  center: { textAlign: "center" },
  loadingMore: {
    height: 60,
    margin: { top: 15 },
  },
});
