import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".innercontainer": {
      // removes permenent vertical scroll bar
      minHeight: "calc(100vh - 156px)",
    },
    "#footer": {
      display: "none",
    },
  },
});

export default useStyles;
