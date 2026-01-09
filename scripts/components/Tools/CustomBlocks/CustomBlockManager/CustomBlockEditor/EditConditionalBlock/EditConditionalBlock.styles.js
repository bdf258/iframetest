import { createUseStyles } from "react-jss";

const labelMinWidth = 170;

export const useStyles = createUseStyles({
  editConditionalBlock: {
    minWidth: 500,
  },
  label: {
    minWidth: labelMinWidth,
  },
  inputContainer: {
    margin: { top: 0, left: 0, right: 0, bottom: 5 },
  },
  editConditionalBlockButtonContainer: {
    marginTop: 5,
  },
  caseFieldInput: {
    width: 200,
  },
  fakeLabel: {
    display: "inline-block",
    padding: [0, 8, 0, 8],
    margin: 0,
    marginLeft: 0,
    background: "#dcdcdc",
    border: "1px solid rgb(192, 192, 192)",
    borderRight: 0,
    minWidth: labelMinWidth,
    height: 30,
    lineHeight: "30px",
    fontSize: "0.9rem",
  },
  labelVariableLabelLength: {
    width: 150,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  displayConditionCard: {
    marginBottom: 7,
  },
  displayConditionHeaderContainer: {
    marginBottom: 5,
  },
  collapseCard: {
    overflowY: "hidden",
    height: 26,
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
  inputDisabled: {
    "&:disabled": {
      color: "#BDBDBD !important",
      WebkitTextFillColor: "#BDBDBD !important",
    },
  },
});
