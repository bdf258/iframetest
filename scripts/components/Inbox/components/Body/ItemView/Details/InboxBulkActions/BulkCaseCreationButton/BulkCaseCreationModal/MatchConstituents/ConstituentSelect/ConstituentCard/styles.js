import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  constituentCard: {
    minHeight: 100,
    width: 200,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
    overflowWrap: "break-word",
    boxShadow: "5px 5px 10px #888888",
    padding: 5,
    margin: 5,
    transition: "unset",
    "&:hover": {
      backgroundColor: "#F2F2F2",
    },
    "&:active": {
      transform: "translate(4px, 4px)",
    },
  },
  buttonReset: {
    border: "none",
    overflow: "visible",
    color: "inherit",
    font: "inherit",
    background: "transparent",
    lineHeight: "normal",
    outline: "none",
    padding: 0,
  },
});
