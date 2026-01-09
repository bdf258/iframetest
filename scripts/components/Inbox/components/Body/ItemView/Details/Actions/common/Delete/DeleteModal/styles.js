import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  modal: { width: (theme) => theme.modal.width.small },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  center: {
    textAlign: "center",
  },
});
