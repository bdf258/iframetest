import { createUseStyles } from "react-jss";

const buttonReset = {
  // button reset
  border: "none",
  padding: 0,
  margin: 0,
  overflow: "visible",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  lineHeight: "normal",
  outline: "none",
  boxShadow: "none",
};

const useStyles = createUseStyles({
  categorisationItem: {
    height: 32,
    width: "max-content",
    display: "flex",
    alignItems: "center",
    margin: 4,
    padding: { top: 2, bottom: 2, left: 8, right: 8 },
    boxShadow: "none",
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: ({ global }) => global && "#dcdcdc",
    borderColor: ({ global }) => global && "aaa",
  },
  inputContainer: {
    margin: { top: 0, right: 8, bottom: 0, left: 0 },
  },
  button: {
    ...buttonReset,
    cursor: "pointer",
    colour: "grey",
    fontSize: "0.8rem",
    width: 75,
  },
  iconButton: {
    ...buttonReset,
    cursor: "pointer",
    height: 25,
    width: 25,
    "& *": {
      fill: ({ required }) => (required ? "#ba000d" : "grey"),
    },
  },
});

export default useStyles;
