import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  bulkSelectButtons: {
    position: "sticky",
    top: 0,
    display: "flex",
    "& button": {
      height: 24,
      flexGrow: 1,
      backgroundColor: "rgb(246, 246, 246)",
      borderColor: "rgb(192, 192, 192)",
      borderStyle: "solid",
      borderWidth: "1px",
      cursor: "pointer",
      border: "none",
      color: "inherit",
      width: 90,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      "&:last-child": {
        borderRight: "none",
      },
    },
  },
});

export default useStyles;
