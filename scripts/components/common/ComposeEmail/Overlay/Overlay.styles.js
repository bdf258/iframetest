import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  overlayContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    background: "white",
    opacity: 0.8,
  },
  textContainer: {
    marginTop: "30vh",
    textAlign: "center",
  },
});
