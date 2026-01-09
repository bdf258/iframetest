import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  smsCharacterLengthCounter: {
    color: "white",
    padding: "1px 6px",
    background: "lightgray",
    borderRadius: 5,
    marginBottom: 5,
    height: 15,
    marginRight: 6,
    marginTop: -20,
    fontSize: 12,
  },
  smsCharacterLengthCounterError: {
    backgroundColor: "red !important",
  },
  labelWidth: { width: 150 },
});
