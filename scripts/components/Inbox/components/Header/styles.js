import { createUseStyles } from "react-jss";
import { getLocale } from "../../../../helpers/localStorageHelper";

const locale = getLocale();

export const useStyles = createUseStyles({
  text: {
    fontSize: "1.7rem",
    fontWeight: 300,
    color: locale == "en_AU" ? "#379946" : "inherit",
    margin: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: { bottom: 8 },
  },
  filtersContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexGrow: 1,
    gap: 8,
  },
});
