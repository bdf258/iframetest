import { Button, FlexBox, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { TranslationContext } from "context/translate";
import classnames from "classnames";
import confirmationModalStyles from "./styles";
import { isNumber } from "../../../../helpers/formValidators";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  modal: { width: ({ theme }) => theme.modal.width.medium },
  textInput: confirmationModalStyles.textInput,
  center: confirmationModalStyles.centerText,
  confirmTextInputContainer: confirmationModalStyles.inputContainer,
});

const cleanValues = (value) =>
  value.toString().toLowerCase().replace(/\s/g, "");

const hasError = (modifyInputValues, inputValue, confirmationValue) => {
  return (
    modifyInputValues(cleanValues(inputValue)) !==
    modifyInputValues(cleanValues(confirmationValue))
  );
};

const handleOnChange = (
  inputValue,
  errorTextToDisplay,
  setErrorText,
  setInput,
  setError,
  hasError,
  modifyInputValues,
  confirmationValue,
  iln
) => {
  if (inputValue === "") {
    setInput("");
    setError(true);
    setErrorText(iln.gettext("Input is required."));
  }

  if (!isNaN(confirmationValue)) {
    if (isNumber(inputValue)) {
      setInput(inputValue);
      setError(hasError(modifyInputValues, inputValue, confirmationValue));
      setErrorText(iln.gettext(errorTextToDisplay));
    } else {
      setInput((inputValue) => inputValue);
    }
  } else {
    setInput(inputValue);
    setError(hasError(modifyInputValues, inputValue, confirmationValue));
    setErrorText(iln.gettext(errorTextToDisplay));
  }
};

const ConfirmationModal = ({
  confirmationValue,
  onConfirm,
  message,
  buttonText,
  modifyInputValues = (x) => x,
  errorTextToDisplay = "Input doesn't match.",
  customClassNames = {},
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iln = useContext(TranslationContext);
  const [inputValue, setInput] = useState("");
  const [error, setError] = useState(true);
  const [errorText, setErrorText] = useState("");

  return (
    <div className={classnames(classes.modal, customClassNames.modal)}>
      <div className={classes.center}>{message}</div>
      <div className={classes.confirmTextInputContainer}>
        <FormTextInput
          customClassNames={{
            container: classes.textInput,
            input: classes.textInput,
          }}
          name="confirm"
          value={inputValue}
          onChange={(e) =>
            handleOnChange(
              e.target.value,
              errorTextToDisplay,
              setErrorText,
              setInput,
              setError,
              hasError,
              modifyInputValues,
              confirmationValue,
              iln
            )
          }
          error={error ? errorText : null}
        />
      </div>
      <FlexBox hAlign="center">
        <Button
          isDisabled={error}
          onClick={() => {
            onConfirm();
          }}
        >
          {buttonText || "Confirm"}
        </Button>
      </FlexBox>
    </div>
  );
};

ConfirmationModal.propTypes = {
  buttonText: propTypes.oneOfType([propTypes.string, propTypes.object]),
  confirmationValue: propTypes.oneOfType([propTypes.string, propTypes.number])
    .isRequired,
  customClassNames: propTypes.shape({ modal: propTypes.string }),
  errorTextToDisplay: propTypes.string,
  message: propTypes.oneOfType([propTypes.string, propTypes.node]),
  modifyInputValues: propTypes.func,
  onConfirm: propTypes.func.isRequired,
};
export default ConfirmationModal;
