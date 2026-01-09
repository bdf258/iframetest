import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  microsoftContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  microsoftLoginButton: {
    display: "flex",
    padding: "0 12px",
    height: 41,
    fontFamily:
      "Segoe UI,Segoe UI Variable Text,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    color: "#5E5E5E",
    background: "#FFFFFF",
    border: "1px solid #8C8C8C",
    borderRadius: 0,
    alignItems: "center",
    "&:hover": {
      color: "#5E5E5E",
      background: "#FFFFFF",
      border: "1px solid #8C8C8C",
    },
    "& span": {
      margin: {
        left: 12,
      },
    },
  },
  errorText: {
    width: "100%",
    fontSize: ({ theme }) => theme.font.sizes.normal,
    height: 20,
    padding: {
      left: 4,
      right: 4,
      top: 4,
    },
    color: ({ theme }) => theme.colors.red,
  },
});

export default useStyles;
