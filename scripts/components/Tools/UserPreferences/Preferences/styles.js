import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: { textAlign: "center" },
  inner: { width: 500, display: "inline-block" },
  inputLabel: { width: 185 },
  inputContainer: { margin: { bottom: 8 } },
  intercomLabel: { 
    width: 185,
    height: 50,
    lineHeight: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  intercomSelect: {
    height: "50px !important",
    minHeight: "50px !important",
    boxSizing: "border-box",
    marginTop: "-10px !important",
  },
  intercomContainer: {
    margin: { bottom: 8 },
    height: "auto",
  },
});

export default useStyles;
