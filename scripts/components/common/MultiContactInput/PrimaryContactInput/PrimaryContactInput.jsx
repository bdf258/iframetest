import { Arrow, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useEffect, useState } from "react";

import { v4 as generateUUID } from "uuid";
import propTypes from "./PrimaryContactInput.propTypes.js";
import useStyles from "./PrimaryContactInput.styles.js";

const asyncWrap = async (func) => func;

const PrimaryContactInput = ({
  customClassNames,
  contactDetails,
  setContactDetails,
  contactDetailName,
  label,
  contactDetailTypeID,
  constituentID,
  source,
  modifyInput,
  onCreate = (x) => x,
  onUpdate = (x) => x,
  setFocused,
  focused,
}) => {
  const classes = useStyles();

  const primaryContactIndex = contactDetails?.findIndex(
    ({ primary }) => primary
  );
  const primaryContact = {
    value: "",
    ...contactDetails[primaryContactIndex === -1 ? 0 : primaryContactIndex],
  };

  const [inputValue, setInputValue] = useState(primaryContact?.value || "");

  useEffect(() => {
    if (primaryContact?.value !== inputValue)
      setInputValue(primaryContact?.value);
  }, [primaryContact?.value]);

  useEffect(() => {
    if (
      inputValue?.trim()?.toLowerCase() ===
      primaryContact?.value?.trim()?.toLowerCase()
    )
      return;

    const timeout = setTimeout(() => {
      if (inputValue.trim() === "" && primaryContact?.value === inputValue)
        return;

      if (primaryContact?.id) {
        const updatedContactDetails = contactDetails;
        const updatedPrimaryContact = {
          ...primaryContact,
          value: inputValue,
        };
        updatedContactDetails[primaryContactIndex] = updatedPrimaryContact;
        setContactDetails([...updatedContactDetails]);
        onUpdate(updatedPrimaryContact);
      } else {
        const newContactDetail = {
          value: inputValue,
          primary: contactDetails.length === 0,
          contactTypeID: contactDetailTypeID,
          constituentID,
          source,
        };
        asyncWrap(onCreate(newContactDetail)).then((newContactDetail) => {
          setContactDetails([
            ...contactDetails,
            { id: `temp-${generateUUID()}`, ...newContactDetail },
          ]);
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <FormTextInput
      name="primaryContactInput"
      value={inputValue}
      onChange={({ target: { value } }) => {
        const modifiedValue = modifyInput(value);
        setInputValue(modifiedValue);
      }}
      label={label}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={contactDetailName}
      keepErrorSpacing={false}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={focused}
      innerComponent={
        !contactDetails || contactDetails?.length === 0 ? null : (
          <Arrow direction="down" className={classes.arrow} />
        )
      }
      customClassNames={{
        ...customClassNames,
        container: classes.primaryContactInputContainer,
      }}
    />
  );
};

PrimaryContactInput.propTypes = propTypes;

export default PrimaryContactInput;
