import { CardHeaderStickyStyles } from "../common/styles";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  cardHeaderActionSummary: {
    ...CardHeaderStickyStyles,
    zIndex: 90,
    paddingBottom: "1em",
    marginBottom: "2em",
    backgroundColor: "#fcfcfc",
    containerType: "inline-size",
  },
  placeholder: {
    position: "absolute",
    top: 45,
    right: 0,
  },
  headerH2: {
    height: 28,
    width: 415,
    margin: "10px 0 5px 0",
  },
  rightMargin: { margin: { right: 10 } },
  leftMargin: { margin: { left: 10 } },
});

export default useStyles;
