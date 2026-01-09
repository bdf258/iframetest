import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  displayConditionHeaderContainer: {
    marginBottom: 5,
    borderBottom: "1px solid lightgrey",
  },
  displayConditionHeader: {
    width: 675,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    margin: { top: 5, bottom: 15 },
  },
  iconButtonContainer: {
    margin: {
      top: 3,
      left: 5,
    },
  },
  deleteDisplayConditionModalContainer: {
    width: 600,
  },
});
