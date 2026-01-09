import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  customBlockDetailsCard: {
    marginBottom: 5,
  },
  savingOverlayContainer: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    zIndex: 100,
    background: "rgba(0,0,0,0.3)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  savingOverlayContentContainer: {
    background: "white",
    padding: "10px 20px",
    border: "1px solid lightgrey",
    borderRadius: 5,
  },
  overlayTitleContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 5,
  },
  overlaySpinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
});
