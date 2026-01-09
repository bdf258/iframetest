import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  centerButton: {
    minWidth: 65,
  },
  contactOption: {
    alignItems: "center",
    gap: 12,
    margin: {
      bottom: 8,
    },
  },
  contactOptionContainer: {
    margin: 0,
    maxWidth: 275,
  },
  spinner: {
    margin: {
      right: 8,
    },
  },
});

export default useStyles;
