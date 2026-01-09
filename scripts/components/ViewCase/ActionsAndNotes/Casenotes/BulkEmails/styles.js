import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  inputContainer: {
    margin: { left: 0, right: 0, bottom: 7 },
    fontSize: ({ theme }) => `${theme.font.sizes.normal} !important`,
  },
  button: {
    fontSize: ({ theme }) => `${theme.font.sizes.normal} !important`,
  },
  emailContentContainer: {
    overflowX: "auto",
  },
  emailAttachmentContainer: {
    marginBottom: 5,
  },
});
