import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  innerModal: {
    width: ({ theme }) => theme.modal.width.medium,
  },
  center: {
    textAlign: "center",
  },
  label: {
    width: "120px",
  },
});

export default useStyles;
