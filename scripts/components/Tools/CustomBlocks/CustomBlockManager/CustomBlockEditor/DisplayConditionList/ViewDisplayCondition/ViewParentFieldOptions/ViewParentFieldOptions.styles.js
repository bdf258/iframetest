import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  fakeLabel: {
    display: "inline-block",
    padding: [0, 8, 0, 8],
    margin: 0,
    marginLeft: 0,
    background: "#dcdcdc",
    border: "1px solid rgb(192, 192, 192)",
    borderRight: 0,
    minWidth: 170,
    height: 30,
    lineHeight: "30px",
    fontSize: "0.9rem",
  },
  labelVariableLabelLength: {
    width: 170,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  parentObjectOptionInputContainer: {
    margin: { top: 0, left: 0, right: 0, bottom: 1 },
  },
});
