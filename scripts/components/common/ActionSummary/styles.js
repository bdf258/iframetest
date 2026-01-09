import { createUseStyles } from "react-jss";
import localStorageHelper from "../../../helpers/localStorageHelper";
import modalStyles from "../Modal/styles";
const version = localStorageHelper
  .getItem("installationPreferences")
  .version.toLowerCase();
export const useStyles = createUseStyles({
  modalCard: modalStyles.positionBelowMainNav,
  modal: {
    width: ({ theme }) => theme.modal.width.large,
  },
  row: {
    cursor: "pointer",
  },
  actionSummaryTableContainer: {
    maxHeight: "60vh",
    overflowY: "auto",
  },
  actionSummaryTable: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
    tableLayout: "fixed",
  },
  cell: {
    height: "30px",
    verticalAlign: "middle",
  },
  typeCell: {
    minWidth: 125,
    width: 125,
  },
  dateCell: {
    minWidth: 200,
    width: 200,
    textAlign: "center",
  },
  iconWrapper: {
    height: "100%",
    display: "inline-flex",
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    margin: {
      left: 4,
      right: 8,
    },
  },
  actionSummaryButton: {
    position: "absolute",
    top: version != "au" ? "53px" : "47px",
    "&:active": {
      top: "auto !important",
      left: "auto !important",
    },
    "@media print": {
      display: "none",
    },
    backgroundColor: "#FFFFFF",
    color: "#363636",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#C0C0C0",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#F2F2F2",
      color: "#363636",
      opacity: 1,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#C0C0C0",
      borderRadius: "5px",
    },
  },
  checkboxes: { display: "flex" },
  checkboxLabel: { minWidth: "unset" },
  checkboxContainer: { margin: { right: 16 } },
  showText: { margin: { right: 16 }, lineHeight: "30px" },
  flexTable: {
    display: "flex",
    "& > :nth-child(1)": {
      margin: {
        right: 4,
      },
    },
  },
});
