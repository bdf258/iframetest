import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  input: {
    margin: {
      left: 0,
      right: 5,
      bottom: 5,
    },
    "&:last-child": {
      marginRight: 0, // Removes margin from the last element
    },
  },
  postcodeInput: {
    marginRight: 0,
  },
});
