import { CardHeaderStickyStyles } from "../common/styles";
import { createUseStyles } from "react-jss";
import localStorageHelper from "../../../../scripts/helpers/localStorageHelper";

const installationPreferences = localStorageHelper.getItem(
  "installationPreferences"
);
export const useStyles = createUseStyles({
  hideCaseDetails: {
    display: "none",
  },
  inputLabel: {
    width: 150,
    minWidth: 150,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  noMargin: {
    margin: 0,
  },
  inputWrapper: {
    margin: { bottom: 7, right: "0.5%", left: "0.5%" },
    minWidth: 335,
    flex: 1,
  },
  lastInputWrapper: {
    marginBottom: 0,
  },
  buttonInputWrapper: {
    margin: { bottom: 7, right: "0.5%", left: "0.5%" },
    minWidth: 335,
    flex: 1,
    // button reset
    border: "none",
    padding: 0,
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
    outline: "none",
  },

  detailsContainer: {
    margin: { left: -7 },
  },
  cardHeaderCaseActions: {
    ...CardHeaderStickyStyles,
    marginBottom: "1.6em",
    containerType: "inline-size",
  },
  detailsCard: {
    margin: { bottom: 10 },
    padding: { top: 18.6, right: 25.6, bottom: 25.6, left: 25.6 },
    position: "relative",
    zIndex: "auto",
  },
  cardHeader: {
    fontSize: "1.5em",
    fontWeight:
      installationPreferences.version.toLowerCase() != "au" ? 400 : 300,
  },
  autoCompleteContainer: {
    flexBasis: "0",
  },
  autoCompleteDropdown: {
    minWidth: "150px",
  },
  caseActionsPlaceholder: {
    position: "absolute",
    top: 45,
    right: 0,
  },
  caseActionsContainer: {
    position: "absolute",
    right: 5,
    top: 26,
    "@media print": {
      display: "none",
    },
  },
});
