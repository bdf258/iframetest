import { createUseStyles } from "react-jss";

const useStyles = (buttonHeight, buttonWidth) =>
  createUseStyles({
    button: {
      display: "block",
      height: `${buttonHeight}px`,
      width: `${buttonWidth}px`,
      minWidth: `${buttonWidth}px`,
      cursor: "pointer",
      borderRadius: 5,
      // button reset
      border: "none",
      padding: 0,
      overflow: "visible",
      background: "transparent",
      color: "inherit",
      font: "inherit",
      lineHeight: "normal",
      outline: "none",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "unset",
      },
    },
    disabled: {
      cursor: "not-allowed",
      opacity: "0.3",
    },
  })();

export default useStyles;
