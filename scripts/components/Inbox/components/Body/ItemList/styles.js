import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  itemList: {
    borderRight: "1px solid #C6C6C6",
    overflowY: "auto",
    fontSize: "0.75rem",
    maxWidth: 350,
    width: 350,
    minWidth: 350,
    userSelect: "none",
    display: ({ hideList }) => hideList && "none",
  },
  list: {
    margin: 0,
  },
  loadingMoreItemsContainer: {
    height: 50,
  },
  InfiniteScrollContainer: {
    position: "relative",
  },
});
