import { Placeholder, Popover } from "@electedtech/electedtech-ui";
import React, { useState } from "react";

import ContactOption from "./ContactOption/ContactOption.jsx";
import CreateNewContactOption from "./CreateNewContactOption/CreateNewContactOption.jsx";
import PrimaryContactInput from "./PrimaryContactInput/PrimaryContactInput.jsx";
import classnames from "classnames";
import propTypes from "./MultiContactInput.propTypes.js";
import useStyles from "./MultiContactInput.styles.js";
import { useTheme } from "react-jss";

const MultiContactInput = ({
  contactDetails,
  setContactDetails,
  contactDetailName,
  contactDetailTypeID,
  constituentID,
  inputValidation = () => true,
  source,
  onCreate = (x) => x,
  onUpdate = (x) => x,
  onDelete = (x) => x,
  modifyInput = (x) => x,
  label,
  customClassNames,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [disableButtons, setDisableButtons] = useState(false);
  const [focused, setFocused] = useState(false);

  if (!contactDetails) return <Placeholder height={32} width={350} />;

  const primaryInput = (
    <PrimaryContactInput
      customClassNames={customClassNames}
      contactDetails={contactDetails}
      setContactDetails={setContactDetails}
      contactDetailName={contactDetailName}
      label={label}
      contactDetailTypeID={contactDetailTypeID}
      constituentID={constituentID}
      source={source}
      modifyInput={modifyInput}
      onCreate={onCreate}
      onUpdate={onUpdate}
      setFocused={setFocused}
      focused={focused}
    />
  );

  return (
    <div
      className={classnames(
        classes.multiContactInput,
        customClassNames?.container
      )}
    >
      {contactDetails?.length > 0 ? (
        <Popover
          width="450px"
          hoverDelayMs={250}
          content={
            <React.Fragment>
              {contactDetails.map((contactDetail, index) => (
                <ContactOption
                  key={contactDetail.id || `temp-${index}`}
                  index={index}
                  contactDetail={contactDetail}
                  contactDetails={contactDetails}
                  setContactDetails={setContactDetails}
                  disableButtons={disableButtons}
                  setDisableButtons={setDisableButtons}
                  onCreate={onCreate}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  inputValidation={inputValidation}
                  modifyInput={modifyInput}
                />
              ))}
              <CreateNewContactOption
                contactDetails={contactDetails}
                setContactDetails={setContactDetails}
                contactDetailName={contactDetailName}
                newContact={{
                  value: "",
                  primary: contactDetails.length === 0,
                  contactTypeID: contactDetailTypeID,
                  constituentID,
                  source,
                }}
              />
            </React.Fragment>
          }
        >
          {primaryInput}
        </Popover>
      ) : (
        primaryInput
      )}
    </div>
  );
};

MultiContactInput.propTypes = propTypes;

export default MultiContactInput;
