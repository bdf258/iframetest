import { editorMaxWidth, editorMinWidth } from "./common/sizeConfig";

import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".cke_contents": {
      width: "21cm !important",
      margin: "0 auto !important",
    },
  },
  ckeditor: {
    "& #cke_editor1": {
      margin: "0 5px 0 5px !important",
    },
  },
  letterEditorContainer: {
    margin: "7px auto 0",
    minWidth: editorMinWidth,
    maxWidth: editorMaxWidth,
    width: "100%",
  },
  buttonBar: {
    display: "flex",
    alignSelf: "flex-start",
  },
  saveLetterStatus: {
    color: "#363636",
    fontSize: "90%",
    margin: 0,
    textAlign: "center",
  },
  hidden: {
    display: "none",
  },
});
