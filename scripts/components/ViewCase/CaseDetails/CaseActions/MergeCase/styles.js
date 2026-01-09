import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  modal: {
    width: ({ theme }) => theme.modal.width.medium,
  },
});
