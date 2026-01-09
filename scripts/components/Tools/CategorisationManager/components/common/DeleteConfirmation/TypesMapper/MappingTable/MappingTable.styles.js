import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  table: {
    border: "none!important",
    boxShadow: "none!important",
  },
  tr: {
    backgroundColor: "unset!important",
  },
  optionInputContainer: {
    minWidth: 265,
    margin: 0,
  },
  inputInput: {
    padding: { top: 0, right: 24, bottom: 0, left: 8 },
  },
  thead: {
    height: 35,
    color: "white",
    fontSize: "1.1em",
    fontWeight: 400,
    "& td": {
      borderBottomLeftRadius: "unset!important",
      borderBottomRightRadius: "unset!important",
      textAlign: "center",
      padding: { left: 8, right: 8 },
      "&:not(:first-child)": {
        borderLeft: "white 3px solid",
      },
    },
  },
});

export default useStyles;
