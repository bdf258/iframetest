import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    display: "flex",
    height: "calc(100vh - 200px)",
    width: 1200,
  },
  emailDisplay: {
    width: "60%",
    minWidth: 400,
    overflowY: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: {
      right: "1rem",
    },
    padding: {
      right: "1rem",
    },
    borderRight: "1px solid #777",
  },
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
  faintDetail: {
    color: "#888",
    fontSize: "90%",
  },
  emailSummary: {
    padding: { top: "0.5rem" },
    margin: { top: "0.5rem" },
    borderTop: "1px solid #888",
  },
  placeholder: {
    padding: 5,
    margin: 5,
    border: "1px solid white",
    borderRadius: 5,
  },
  skipButton: {
    position: "absolute",
    bottom: "30px",
    left: "calc(60% - 125px) !important",
    top: "unset !important",
  },
});
