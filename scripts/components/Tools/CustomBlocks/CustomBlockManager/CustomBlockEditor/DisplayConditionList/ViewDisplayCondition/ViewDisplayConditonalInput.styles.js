import { createUseStyles } from "react-jss";

const labelMinWidth = 170;

export const useStyles = createUseStyles({
  editConditionModalContainer: { width: 600 },
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
  displayConditionCard: {
    marginBottom: 7,
  },
  crossIconContainer: {
    marginTop: 4,
    marginLeft: 2,
  },
  collapseCard: {
    overflowY: "hidden",
    height: 26,
  },
});
