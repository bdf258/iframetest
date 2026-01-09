import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  constituent: {
    fontSize: "0.9rem",
    color: "rgb(54, 54, 54)",
    textDecoration: "underline",
    fontWeight: 400,
    "&:link": "rgb(54, 54, 54)",
    "&:visited": "rgb(54, 54, 54)",
    "&:hover ": "rgb(54, 54, 54)",
    "&:active": "rgb(54, 54, 54)",
  },
  lackPermissions: {
    fontSize: "0.9rem",
  },
});
