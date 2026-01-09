import {
  Button,
  FormChipInput,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { disabledFeatures } from "../../../../helpers/localStorageHelper";
import emailRegex from "../../../../consts/emailRegex";
import propTypes from "./propTypes";
import { useStyles } from "./styles";
import { useTheme } from "react-jss";

const enableEmailAddressSearch =
  !disabledFeatures.includes("emailAddressSearch");

const EmailInput = ({
  hasDuplicates,
  value,
  onChange,
  customClassNames,
  onKeyDown,
  onBlur,
  toggleCcInputVisibility,
  toggleBccInputVisibility,
  label,
  name,
  innerComponent = false,
}) => {
  const removeBlankEmailAddresses = (value) => {
    const emailChips = value.chips.filter((email) => !!email.label);
    return {
      ...value,
      chips: [
        ...emailChips.map((chip) => ({ ...chip, label: chip?.label.trim() })),
      ],
    };
  };

  const removeTextInputValue = (e) => {
    return { ...e, target: { ...e.target, value: { ...value, value: "" } } };
  };
  const handleKeyDown = (e) => {
    if (e.key in submitKeys) {
      removeTextInputValue(e);
    }
    onKeyDown(e);
  };

  const iln = useContext(TranslationContext);

  const { modalActions } = useContext(ModalContext);

  const theme = useTheme();
  const classes = useStyles({ theme });

  const submitKeys = [",", ";", " ", "Enter"];

  return (
    <FormChipInput
      error={hasDuplicates ? iln.gettext("Duplicate email address") : null}
      value={removeBlankEmailAddresses(value)}
      customClassNames={customClassNames}
      label={iln.gettext(label)}
      name={name}
      chipSource={
        enableEmailAddressSearch
          ? (term, signal) =>
              api.getAutoCompleteOptions({ term }, modalActions, iln, signal)
          : []
      }
      onChange={(e) => {
        e.target.value.value = "";
        onChange(e);
      }}
      onKeyDown={(e) => handleKeyDown(e)}
      keepErrorSpacing={false}
      autoComplete={enableEmailAddressSearch}
      addNewChips={true}
      canEdit
      validateChipRegex={emailRegex}
      createChipOnKey={submitKeys}
      createChipOnBlur
      onBlur={(e) => onBlur(removeTextInputValue(e))}
      innerComponent={
        innerComponent ? (
          <span className={classes.buttonBar}>
            <Button
              customClassNames={classes.inputButton}
              type={"text"}
              onClick={() => toggleCcInputVisibility()}
            >
              {iln.gettext("Cc")}
            </Button>
            <Button
              customClassNames={classes.inputButton}
              type={"text"}
              onClick={() => toggleBccInputVisibility()}
            >
              {iln.gettext("Bcc")}
            </Button>
          </span>
        ) : null
      }
    />
  );
};

EmailInput.propTypes = propTypes;

export default EmailInput;
