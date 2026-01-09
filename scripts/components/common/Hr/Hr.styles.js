import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  hrText: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    color: "#555",
    margin: ({ margin }) => `${margin}px 0`,
    "&::before, &::after": {
      content: '""',
      flex: 1,
      borderBottom: "1px solid #ccc",
    },
    "&:not(:empty)::before": {
      marginRight: "0.75em",
    },
    "&:not(:empty)::after": {
      marginLeft: "0.75em",
    },
  },
});

export default useStyles;
