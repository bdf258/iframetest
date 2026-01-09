import { CardHeaderStickyStyles } from "../../common/styles";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  noMargin: {
    margin: 0,
  },
  customBlocksWrapper: {
    flexFlow: "wrap",
    gap: 10,
  },
  inputLabel: {
    width: 150,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  customBlockCard: {
    flex: 1,
    minWidth: 335,
    margin: { bottom: 10 },
    padding: { top: 18.6, right: 25.6, bottom: 25.6, left: 25.6 },
    position: "relative",
    zIndex: "auto",
  },
  cardHeaderCustomBlocks: {
    ...CardHeaderStickyStyles,
    marginBottom: "1.6em",
    position: "relative",
    zIndex: "auto",
  },
  cardHeader: {
    fontSize: "1.5em",
    fontWeight: 300,
  },
  inputWrapper: {
    margin: { bottom: 7, right: "0.5%", left: "0.5%" },
    minWidth: 335,
    flex: 1,
  },
});
