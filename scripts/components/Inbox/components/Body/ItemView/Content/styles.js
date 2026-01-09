import { createUseStyles } from "react-jss";

const paddingValue = 1;

export const useStyles = createUseStyles({
  content: {
    padding: {
      top: `${paddingValue / 2}rem`,
      right: `${paddingValue}rem`,
      bottom: `${paddingValue / 2}rem`,
      left: `${paddingValue}rem`,
    },
    wordWrap: "break-word",
    display: "block",
    width: `calc(100% - ${paddingValue * 2}rem)`,
    whiteSpace: ({ displayPlainText }) => (displayPlainText ? "pre-line" : ""),
    fontSize: "0.90rem",
  },
});
