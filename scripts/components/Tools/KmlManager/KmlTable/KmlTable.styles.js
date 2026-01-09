import { createUseStyles } from "react-jss";

const defaultCell = {
  verticalAlign: "middle",
  textAlign: "center",
  padding: { left: 5, right: 5, top: 0, bottom: 0 },
};

const useStyles = createUseStyles({
  kmlCell: defaultCell,
  actionCell: { ...defaultCell, whiteSpace: "nowrap" },
});

export default useStyles;
