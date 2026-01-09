import { createUseStyles } from "react-jss";

const noMargin = { top: 0, right: 0, bottom: 0, left: 0 };

const useStyles = createUseStyles({
  formContainer: {
    margin: { bottom: 24 },
  },
  formSectionHeading: {
    minWidth: "100% !important",
  },
  formSection: {
    display: "flex",
    flexWrap: "wrap",
    margin: { bottom: 4 },
    "& > *": {
      flex: 1,
      minWidth: "50%",
    },
  },
  combinedNameSection: {
    margin: { bottom: 4 },
  },
  exportInput: {
    margin: { ...noMargin, top: 24, bottom: 12 },
  },
  noMargin: { margin: noMargin },
  label: {
    width: 250,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default useStyles;
