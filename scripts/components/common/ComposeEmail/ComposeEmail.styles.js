import { editorMaxWidth, editorMinWidth } from "./common/sizeConfig";

import { createUseStyles } from "react-jss";
import modalStyles from "../Modal/styles";

export const useStyles = createUseStyles({
  modalCard: modalStyles.positionBelowMainNav,
  inputContainer: {
    height: "auto",
    margin: { right: 0, bottom: 5, left: 0 },
  },
  emailInputErrorMessage: {
    margin: { top: -5, bottom: 5 },
  },
  inputFontSize: {
    fontSize: ({ theme }) => `${theme.font.sizes.normal} !important`,
  },
  signatureInfo: {
    color: "red",
    fontSize: "75%",
    marginTop: 0,
  },
  composeEmailContainer: {
    margin: "7px auto 5px",
    minWidth: editorMinWidth,
    maxWidth: editorMaxWidth,
  },
  mergeCodeContainer: {
    marginTop: 7,
    minWidth: 510,
    width: 510,
    borderLeft: "lightgrey 1px solid",
    paddingLeft: 16,
    marginLeft: 16,
  },
  mergeButton: {
    marginBottom: 10,
  },
  hidden: {
    display: "none",
  },
  inputLabel: {
    width: 95,
    minWidth: 95,
  },
});
