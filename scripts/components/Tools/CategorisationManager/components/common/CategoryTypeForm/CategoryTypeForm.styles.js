import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    border: "1px solid lightgrey",
    borderRadius: 8,
    padding: 8,
    margin: { bottom: 16 },
  },
  sectionHeading: {
    margin: { top: 8, bottom: 8 },
  },
  inputLabel: { width: 112 },
  inputContainer: { margin: { left: 0, right: 0, bottom: 8 } },
});

export default useStyles;
