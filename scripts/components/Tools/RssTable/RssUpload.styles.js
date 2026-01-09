import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    marginTop: "40px",
    width: "500px",
    paddingBottom: "50px",
  },
  submitButton: {
    float: "right",
    marginTop: "10px",
  },
  modalCard: {
    width: "500px",
  },
  tableCell: {
    textAlign: "center",
    verticalAlign: "middle",
  },
  addButton: {
    margin: "30px 0 20px 0",
  },
  actionsCell: {
    minWidth: "130px",
  },
  urlCell: {
    minWidth: "230px",
  },
  chipDisplay: {
    paddingLeft: "5px",
  },
  chipInput: {
    margin: "0px 5px 0px 5px",
  },
});

export default useStyles;
