import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  center: {
    textAlign: "center",
  },
  container: {
    margin: { left: 0, right: 0, bottom: 16 },
  },
  modal: { minWidth: 400 },
});

export default useStyles;
