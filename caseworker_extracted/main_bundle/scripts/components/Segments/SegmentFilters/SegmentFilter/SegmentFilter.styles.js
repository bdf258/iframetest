import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  card: {
    padding: "10px 5px",
    marginBottom: 10,
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)",
  },
  inputContainer: {
    marginBottom: 5,
  },
  segmentQueryInput: {
    maxWidth: 100,
  },
  constituentLabelContainer: {
    margin: "0 5px",
    height: 30,
    lineHeight: "30px",
  },
  filterContainer: {
    width: "100%",
  },
  filterDisabled: {
    pointerEvents: "none",
  },
});
