import { createUseStyles } from "react-jss";
import theme from "@electedtech/theme";

export const useStyles = createUseStyles({
  spacing: {
    margin: {
      bottom: theme.spacing,
    },
  },
  half: {
    width: "calc(50% - 10px)",
    display: "inline-block",
    border: "1px solid #aeaeae",
    borderRadius: "5px",
    textAlign: "left",
    verticalAlign: "top",
    backgroundColor: "transparent",
    /* Button Reset */
    margin: 0,
    padding: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
    "& > *": {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      "& label": { minWidth: 132, borderRadius: 0 },
    },
    "& > :first-child": {
      borderRadius: "5px 5px 0 0",
      "& label": {
        borderRadius: "5px 0 0 0",
      },
    },
    "& > :last-child": {
      borderRadius: "0 0 5px 5px",
      borderBottom: "none",
      "& label": {
        borderRadius: "0 0 0 5px",
      },
    },
  },
  selected: {
    border: "1px solid blue",
  },
});
