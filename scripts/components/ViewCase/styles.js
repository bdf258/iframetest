import { createUseStyles } from "react-jss";
import { getInstallationPreferences } from "@electedtech/helpers/localStorageHelper";

const { version } = getInstallationPreferences();

export const useStyles = createUseStyles({
  bottomCasenoteCreators: {
    marginTop: 16,
  },
  infiniteScroll: {
    height: `calc(100vh - ${version.toUpperCase() === "AU" ? 136 : 130}px)`,
    transform: version.toUpperCase() === "AU" ? "translateY(-7px)" : "initial",
    overflowY: "auto",
    "@media print": {
      overflowY: "unset",
      height: "auto !important",
      maxHeight: "none !important",
      transform: "none !important",
    },
  },
  footer: {
    backgroundColor: ({ theme }) => theme.colors.blue,
    textAlign: "right",
    paddingRight: 20,
  },
  footerButton: {
    color: "white",
    fontSize: "70%",
  },
  customFieldDateInputContainer: {
    position: "relative",
    zIndex: 100,
  },
});
