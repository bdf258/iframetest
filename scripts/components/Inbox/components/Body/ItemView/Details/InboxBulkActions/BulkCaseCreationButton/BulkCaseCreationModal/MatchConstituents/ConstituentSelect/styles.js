import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  constituentSelect: {
    width: "40%",
    overflowY: "auto",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "1rem",
    alignItems: "center",
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
    textDecoration: "underline",
    cursor: "pointer",
  },
  placeholder: {
    padding: 5,
    margin: 5,
    border: "1px solid white",
    borderRadius: 5,
  },
  confirmDetails: {
    overflowY: "auto",
    width: "40%",
  },
});
