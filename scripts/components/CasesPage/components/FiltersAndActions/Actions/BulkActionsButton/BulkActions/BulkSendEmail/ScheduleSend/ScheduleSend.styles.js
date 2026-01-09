import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  scheduleSendButtonBarContainer: {
    margin: {
      left: 5,
      right: 5,
    },
  },
  hourInput: {
    width: 100,
  },
  timeInputLabel: {
    marginRight: 0,
    borderRight: 0,
  },
});

export default useStyles;
