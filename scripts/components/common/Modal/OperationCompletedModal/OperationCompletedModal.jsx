import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { TranslationContext } from "context/translate";
import confirmationModalStyles from "../ConfirmationModal/styles";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  center: confirmationModalStyles.centerText,
});

const OperationCompletedModal = ({
  children,
  message,
  buttonText = "Done",
  handleDone,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);

  return (
    <React.Fragment>
      <p className={classes.center}>{message}</p>
      {children}
      <FlexBox hAlign="center">
        <Button onClick={() => handleDone()}>{iln.gettext(buttonText)}</Button>
      </FlexBox>
    </React.Fragment>
  );
};

export default OperationCompletedModal;

OperationCompletedModal.propTypes = {
  buttonText: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  handleDone: propTypes.func.isRequired,
  message: propTypes.oneOfType([propTypes.string, propTypes.node]),
};
