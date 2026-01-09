import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  contactTypeList: {
    listStyle: "none",
    "& li": { textAlign: "center" },
  },
});

export default useStyles;
