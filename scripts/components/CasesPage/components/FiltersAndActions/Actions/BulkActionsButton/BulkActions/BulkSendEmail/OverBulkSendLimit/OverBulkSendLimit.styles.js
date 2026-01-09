import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  innerModalContainer: {
    width: ({ theme }) => theme.modal.width.medium,
  },
});
