import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  reviewNoteBox: {
    margin: { bottom: 8 },
    overflow: "hidden",
    resize: "vertical",
    border: "1px solid #c0c0c0",
    height: 130,
    minHeight: 64,
  },
  label: {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #c0c0c0",
    borderRadius: 0,
    padding: "0 8px",
    height: 30,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  container: {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    resize: "none",
    height: "calc(100% - 31px)",
    border: "none",
  },
});

export default useStyles;
