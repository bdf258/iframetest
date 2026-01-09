import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  categorisationEditor: {
    width: ({ fullWidth }) => (fullWidth ? "100%" : 750),
  },
});

export default useStyles;
