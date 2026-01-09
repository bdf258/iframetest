import { createUseStyles } from "react-jss";
import modalStyles from "../../Modal/styles";

export const useStyles = createUseStyles({
  actionsButtonBar: {
    marginBottom: 10,
  },
  modalCard: modalStyles.positionBelowMainNav,
});
