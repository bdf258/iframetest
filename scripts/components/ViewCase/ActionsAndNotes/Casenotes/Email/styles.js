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
    fontSize: ({ theme }) => theme.font.sizes.normal,
  },
  emailAttachmentContainer: {
    marginBottom: 5,
  },
  actionButton: {
    minWidth: 50,
  },
});
