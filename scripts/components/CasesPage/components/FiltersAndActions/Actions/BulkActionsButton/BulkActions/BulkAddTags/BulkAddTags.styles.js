import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  center: {
    textAlign: "center",
  },
  addTagsInput: (theme) => theme.baseFontSize,
  textAreaInput: (theme) => theme.baseFontSize,
  innerModalContainer: {
    width: (theme) => theme.modal.width.medium,
  },
});

export default useStyles;
