import { EmailAttachmentManagerStyles } from "../common/styles";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  attachmentText: {
    fontSize: "0.8em",
    marginLeft: "0.5em",
  },
  spinnerContainer: {
    marginTop: 12,
    marginRight: 12,
  },
  buttonDisabled: {
    color: "#dcdcdc",
  },
  iconDisabled: {
    fill: "#dcdcdc",
  },
  fileList: {
    minWidth: 550,
    maxHeight: 190,
    overflowY: "auto",
    "& ul": { padding: 0 },
    "& li": {
      listStyle: "none",
    },
  },
  button: {
    marginTop: 20,
  },
  ...EmailAttachmentManagerStyles,
});
