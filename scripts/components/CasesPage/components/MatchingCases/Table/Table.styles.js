import { createUseStyles } from "react-jss";

const minWidth = 150;

const useStyles = createUseStyles({
  table: {
    fontSize: "0.9rem",
    width: "100%",
    minWidth: "1250px",
  },
  tableWrapper: { overflowX: "auto", maxWidth: "calc(100vw - 40px)" },
  avatarCell: {
    width: 40,
  },
  caseCell: {},
  constituentCell: {
    textWrap: "wrap",
    minWidth,
  },
  openedCell: {
    minWidth,
  },
  typeCell: { minWidth },
  statusCell: {},
  summaryCell: {},
  accessibleByCell: {},
  lastActionedCell: {
    whiteSpace: "nowrap",
  },
});

export default useStyles;
