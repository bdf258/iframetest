import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  addressField: {
    display: "flex",
    color: "rgb(54, 54, 54)",
    fontSize: "0.9rem",
  },
  label: {
    margin: {
      right: "0.6rem",
    },
  },
  addressList: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "52.5px",
    overflowY: "auto",
    wordBreak: "break-word",
  },
});
