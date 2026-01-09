import {
  ButtonBarStyles,
  CardHeaderStickyStyles,
  CardStyles,
} from "../../../common/styles";

import { createUseStyles } from "react-jss";
import localStorageHelper from "../../../../../../scripts/helpers/localStorageHelper";

const installationPreferences = localStorageHelper.getItem(
  "installationPreferences"
);

const caseNoteIconWidth = "72px";
export const useStyles = createUseStyles({
  casenote: {
    "@media print": {
      pageBreakInside: "avoid",
      breakInside: "avoid",
    },
  },
  cardHeader: {
    ...CardHeaderStickyStyles,
    paddingTop: 25,
    paddingBottom: 17,
    top: 55,
  },
  title: {
    fontSize: "1.2em",
    fontWeight:
      installationPreferences.version.toLowerCase() != "au" ? 400 : 300,
  },
  card: {
    ...CardStyles,
    marginTop: 0,
    paddingTop: 0,
    "@media print": {
      pageBreakInside: "avoid",
      breakInside: "avoid",
    },
  },
  buttonBar: {
    ...ButtonBarStyles,
    marginTop: ({ theme }) => theme.viewCaseNoteActionsButtonBar.marginTop,
    "@media print": {
      display: "none",
    },
  },
  cardBody: { display: "flex" },
  main: { flexGrow: 1, width: `calc(100% - ${caseNoteIconWidth})` },
  icon: { width: caseNoteIconWidth },
  footer: { width: "100%", margin: { top: "1rem" } },
});
