import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  modal: {
    width: ({ theme }) => theme.modal.width.small + 32,
  },
  selectButton: {
    height: 64,
  },
  search: { marginBottom: 12 },
});
