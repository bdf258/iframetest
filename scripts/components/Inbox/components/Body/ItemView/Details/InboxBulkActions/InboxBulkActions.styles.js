import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  bulkActions: {
    position: "sticky",
    top: 0,
    padding: "10px 0",
    borderBottom: "1px solid #C6C6C6",
    textAlign: "center",
    "& button": {
      margin: {
        right: 5,
        left: 5,
        bottom: 10,
      },
    },
    "& p, h3": {
      margin: { top: 0, right: 5, bottom: 10, left: 5 },
    },
  },
});
