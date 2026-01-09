import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  spacing: {
    margin: {
      bottom: 8,
    },
  },
  chipInputContainer: {
    margin: "0 10px 8px 5px !important",
  },
  createCaseButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useStyles;
