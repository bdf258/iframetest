import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: { margin: { top: 10, bottom: 5 } },
  container: { textAlign: "center" },
  inner: { width: 500, display: "inline-block" },
  spacing: { margin: { bottom: 8 } },
});

export default useStyles;
