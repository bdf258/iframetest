import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  refreshOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  refreshText: {
    color: "grey",
    fontSize: "0.9rem",
  },
});

export default useStyles;
