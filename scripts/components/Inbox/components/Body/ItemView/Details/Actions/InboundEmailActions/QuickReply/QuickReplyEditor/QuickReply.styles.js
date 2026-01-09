import {
  editorMaxWidth,
  editorMinWidth,
} from "../../../../../../../../../common/ComposeEmail/common/sizeConfig";

import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  input: {
    margin: {
      left: 0,
      right: 0,
      bottom: 5,
    },
  },
  quickReplyContainer: {
    margin: "7px auto 5px",
    minWidth: editorMinWidth,
    maxWidth: editorMaxWidth,
  },
  errorText: {
    color: "red",
    fontSize: "90%",
  },
  hidden: {
    display: "none",
  },
  buttonContainer: {
    position: "absolute",
    right: 16,
  },
  loadingText: {
    color: "#666",
  },
});
