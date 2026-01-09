import { EmailAttachmentManagerStyles } from "../common/styles";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  iconDisabled: {
    fill: "#dcdcdc",
  },
  attachingFileLoading: {
    background: "rgba(255,255,255,0.8)",
    display: "block",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
  },
  ...EmailAttachmentManagerStyles,
});
