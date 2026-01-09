import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: { height: "calc(100vh - 130px)" },
  title: {
    fontSize: "10em",
    fontWeight: 600,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "3em",
    textAlign: "center",
    fontWeight: 300,
  },
  message: {
    width: 650,
    fontSize: "1.5em",
    textAlign: "center",
    fontWeight: 300,
    margin: { top: "1em", bottom: "1em" },
  },
});
