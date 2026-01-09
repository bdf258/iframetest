import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  loadingContainer: {
    marginTop: -85,
    marginLeft: -40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.8)",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: "#363636",
  },
});
