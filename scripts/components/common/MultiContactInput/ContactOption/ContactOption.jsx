import {
  Button,
  FlexBox,
  FormTextInput,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";

import TranslationContext from "../../../../context/translation/TranslationContext.js";
import { v4 as generateUUID } from "uuid";
import propTypes from "./ContactOption.propTypes.js";
import useStyles from "./ContactOption.styles.js";

let typingTimeout;

const asyncWrap = async (func) => func;

const ContactOption = ({
  contactDetail,
  contactDetails,
  setContactDetails,
  index,
  onCreate = (x) => x,
  onUpdate = (x) => x,
  onDelete = (x) => x,
  disableButtons,
  setDisableButtons,
  inputValidation = () => true,
  modifyInput = (x) => x,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const [creating, setCreating] = useState(false);
  const [patching, setPatching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [priming, setPriming] = useState(false);

  const [inputValue, setInputValue] = useState(contactDetail.value);

  useEffect(() => {
    if (contactDetail?.value !== inputValue)
      setInputValue(contactDetail?.value);
  }, [contactDetail?.value]);

  const passesValidation = inputValidation(inputValue);

  return (
    <FlexBox className={classes.contactOption}>
      <FormTextInput
        name="contactOption"
        customClassNames={{ container: classes.contactOptionContainer }}
        value={inputValue}
        disabled={disableButtons}
        onChange={({ target: { value: textValue }, currentTarget }) => {
          clearTimeout(typingTimeout);

          const modifiedValue = modifyInput(textValue);
          setInputValue(modifiedValue);

          if (passesValidation) {
            typingTimeout = setTimeout(() => {
              const newContactDetails = contactDetails;
              newContactDetails[index] = {
                ...newContactDetails[index],
                value: modifiedValue,
              };
              setContactDetails([...newContactDetails]);
              if (contactDetail.id) {
                setDisableButtons(true);
                setPatching(true);

                asyncWrap(onUpdate({ ...contactDetail, value: modifiedValue }))
                  .catch(() => {
                    setContactDetails([...contactDetails]);
                    setInputValue(contactDetail.value);
                  })
                  .finally(() => {
                    setPatching(false);
                    setDisableButtons(false);
                  })
                  .then(() => {
                    currentTarget.focus();
                  });
              }
            }, 500);
          }
        }}
        keepErrorSpacing={false}
        innerComponent={
          patching && (
            <Spinner customClassNames={{ container: classes.spinner }} />
          )
        }
      />
      {contactDetail.id
        ? [
            <Button
              key="makePrimary"
              className={classes.centerButton}
              isDisabled={contactDetail.primary || disableButtons}
              onClick={() => {
                setPriming(true);
                setDisableButtons(true);

                const currentPrimary = contactDetails.find(
                  ({ primary }) => primary
                );

                Promise.all([
                  asyncWrap(
                    onUpdate({
                      ...contactDetail,
                      primary: true,
                    })
                  ),
                  currentPrimary
                    ? asyncWrap(
                        onUpdate({
                          ...currentPrimary,
                          primary: false,
                        })
                      )
                    : () => {},
                ])
                  .then(([newPrimaryOption]) => {
                    const newContactDetails = contactDetails.map(
                      (contactDetail) => ({
                        ...contactDetail,
                        primary: false,
                      })
                    );

                    newContactDetails[index] = newPrimaryOption;

                    setContactDetails([...newContactDetails]);
                  })
                  .finally(() => {
                    setPriming(false);
                    setDisableButtons(false);
                  });
              }}
              type="text"
              size="small"
            >
              {!priming ? (
                contactDetail.primary ? (
                  iln.gettext("Primary")
                ) : (
                  iln.gettext("Make Primary")
                )
              ) : (
                <Spinner />
              )}
            </Button>,
            <Button
              key="delete"
              isDisabled={disableButtons}
              className={classes.centerButton}
              onClick={() => {
                setDeleting(true);
                setDisableButtons(true);
                asyncWrap(onDelete(contactDetail))
                  .then(() => {
                    const indexToRemove = index;
                    const wasPrimary = contactDetails[indexToRemove].primary;

                    const newContactDetails = contactDetails.filter(
                      (x, idx) => idx !== indexToRemove
                    );

                    if (wasPrimary && newContactDetails.length > 0)
                      newContactDetails[0] = {
                        ...newContactDetails[0],
                        primary: true,
                      };

                    setContactDetails([...newContactDetails]);
                  })
                  .finally(() => {
                    setDeleting(false);
                    setDisableButtons(false);
                  });
              }}
              type="text"
              size="small"
            >
              {!deleting ? iln.gettext("Delete") : <Spinner />}
            </Button>,
          ]
        : [
            <Button
              key="save"
              className={classes.centerButton}
              isDisabled={
                disableButtons ||
                inputValue.trim().length === 0 ||
                !passesValidation ||
                contactDetails.some(
                  ({ value: existingValue, id: existingID }) =>
                    existingID !== undefined &&
                    existingValue.trim().toLowerCase() ===
                      inputValue.trim().toLowerCase()
                )
              }
              onClick={() => {
                setCreating(true);
                setDisableButtons(true);

                asyncWrap(
                  onCreate({
                    ...contactDetail,
                    value: inputValue,
                  })
                )
                  .then((newOption) => {
                    const newContactDetails = contactDetails;
                    newContactDetails[index] = {
                      id: `temp-${generateUUID()}`,
                      ...newOption,
                    };

                    setContactDetails([...newContactDetails]);
                  })
                  .finally(() => {
                    setCreating(false);
                    setDisableButtons(false);
                  });
              }}
              type="text"
              size="small"
            >
              {!creating ? iln.gettext("Save") : <Spinner />}
            </Button>,
            <Button
              className={classes.centerButton}
              key="cancel"
              isDisabled={disableButtons}
              onClick={() => {
                const indexToRemove = index;

                const newContactDetails = contactDetails.filter(
                  (x, idx) => idx !== indexToRemove
                );

                setContactDetails([...newContactDetails]);
              }}
              type="text"
              size="small"
            >
              {iln.gettext("Cancel")}
            </Button>,
          ]}
    </FlexBox>
  );
};

ContactOption.propTypes = propTypes;

export default ContactOption;
