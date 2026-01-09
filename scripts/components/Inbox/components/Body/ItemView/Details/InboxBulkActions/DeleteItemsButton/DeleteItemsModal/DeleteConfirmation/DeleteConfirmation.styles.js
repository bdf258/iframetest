import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  deleteConfirmationContainer: {
    width: ({ theme }) => theme.modal.width.medium,
  },
});
