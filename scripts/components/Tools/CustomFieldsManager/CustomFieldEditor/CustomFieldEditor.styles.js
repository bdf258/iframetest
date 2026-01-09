import { createUseStyles } from "react-jss";

const labelMinWidth = 165;

export default createUseStyles({
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
  label: {
    minWidth: labelMinWidth,
  },
  inputContainer: {
    margin: { top: 0, left: 0, right: 0, bottom: 5 },
  },
  optionManagerContainer: {
    marginLeft: 0,
    marginRight: 5,
  },
  optionManagerInput: {
    height: 30,
  },
  optionManagerInputName: {
    margin: 0,
  },
  optionsHolder: {
    marginBottom: 5,
  },
  addOptionButtonContainer: {
    border: "1px dashed grey",
    borderRadius: 5,
    width: "100%",
    height: 30,
    background: "#EFEFEF",
  },
  addButtonHolder: {
    marginTop: 10,
  },
  individualOptionHolder: {
    marginBottom: 2,
  },
  optionIDContainer: {
    width: "50px",
    flexGrow: 0,
    flexBasis: "50px",
  },
  optionIDInput: {
    minWidth: "34px",
    flexGrow: 0,
    flexBasis: 0,
    textAlign: "center",
  },
  addOptionButton: {
    height: 32,
  },
  filterOptionsLabel: {
    fontSize: 12,
  },
  modal: { width: 600 },
  mapDeletedOptions: { width: 500 },
  mapDeletedOptionContainer: { marginLeft: 0 },
  continueHolder: { marginBottom: "1em", color: "red", fontWeight: "bold" },
  center: { textAlign: "center" },
  clearButton: {
    height: 32,
    boxShadow: "none",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
  },
  customFieldErrorNotification: {
    marginTop: "1rem",
  },
  inputDisabled: {
    "&:disabled": {
      color: "#BDBDBD !important",
      WebkitTextFillColor: "#BDBDBD !important",
    },
  },
});
