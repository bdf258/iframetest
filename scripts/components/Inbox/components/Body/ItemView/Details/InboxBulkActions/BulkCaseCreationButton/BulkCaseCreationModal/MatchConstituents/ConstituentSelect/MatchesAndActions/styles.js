import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  center: {
    textAlign: "center",
    "& > :first-child": {
      margin: { bottom: 12 },
    },
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "center",
  },
});
