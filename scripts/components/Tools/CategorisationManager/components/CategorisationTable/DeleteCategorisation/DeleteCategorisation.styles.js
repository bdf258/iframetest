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
  iconButton: {
    ...buttonReset,
    cursor: "pointer",
    height: 25,
    width: 25,
  },
  modalWidth: { minWidth: 500 },
});

export default useStyles;
