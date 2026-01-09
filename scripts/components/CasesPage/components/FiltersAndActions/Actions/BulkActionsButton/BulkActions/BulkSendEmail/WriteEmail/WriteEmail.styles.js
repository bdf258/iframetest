import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  "@global": {
    "#cke_1_top": { marginLeft: "unset" },
  },
  autoComplete: {
    margin: {
      left: 5,
      right: 5,
    },
  },
  spacing: {
    margin: ({ theme }) => `0px 5px ${theme.spacing}px 5px`,
  },
  ckeditor: {
    "& #cke_editor1": {
      margin: "0 5px 0 5px !important",
    },
  },
  buttonRow: {
    width: "inherit !important",
    margin: {
      left: 5,
      right: 5,
    },
  },
  mergeCodes: {
    borderLeft: "lightgrey 1px solid",
    paddingLeft: 16,
    marginLeft: 16,
  },
  mergeCode: {
    margin: { bottom: 5 },
  },
  center: { textAlign: "center" },
  resultCell: {
    padding: "10px 24px",
  },
  attachmentWarning: {
    color: "red",
    fontSize: "0.8rem",
  },
  attachmentInputContainer: {
    margin: {
      top: 0,
      right: 5,
      bottom: 8,
      left: 5,
    },
  },
});

export default useStyles;
