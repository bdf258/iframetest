import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  filtersAndActions: {
    display: "flex",
    padding: { top: 10, right: 10, bottom: 0, left: 10 },
    margin: { bottom: 5 },
    minWidth: "min-content",
  },
});

export default useStyles;
