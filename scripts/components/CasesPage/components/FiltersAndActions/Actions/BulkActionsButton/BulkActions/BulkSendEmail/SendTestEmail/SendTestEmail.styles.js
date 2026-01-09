import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  spacing: {
    margin: ({ theme }) => `0px 5px ${theme.spacing}px 5px`,
  },
  button: { display: "flex", alignItems: "center", justifyContent: "center" },
});

export default useStyles;
