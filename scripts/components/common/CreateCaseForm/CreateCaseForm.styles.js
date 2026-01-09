import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  spacing: {
    marginBottom: 8,
  },
  containerSpacing: {
    margin: { left: 0, right: 0 },
    marginBottom: 8,
  },
  removeMargin: {
    margin: 0,
  },
  label: {
    minWidth: 150,
    maxWidth: 150,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export default useStyles;
