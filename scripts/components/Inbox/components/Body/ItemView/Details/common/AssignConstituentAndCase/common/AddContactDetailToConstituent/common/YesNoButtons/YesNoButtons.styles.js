import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  buttons: {
    gap: 16,
    "& button": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export default useStyles;
