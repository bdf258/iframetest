import React, { useContext, useState } from "react";
import {
  constituentTypeID,
  organisationTypeID,
  someoneElseTypeID,
} from "../consts/contactTypeIDs.js";

import BlankEmail from "../../ComposeEmail/consts/BlankEmail";
import ComposeEmail from "../../ComposeEmail/ComposeEmail.jsx";
import EmailContactSelect from "./EmailContactSelect/EmailContactSelect.jsx";
import EmailContactTypeList from "./EmailContactTypeList/EmailContactTypeList.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./WriteEmail.propTypes.js";
import useGetCustomFieldMergeCodeList from "../../../../hooks/useGetCustomFieldMergeCodeList.js";
import useStyles from "./WriteEmail.styles.js";

const WriteEmail = ({
  emailSent,
  emailSaved,
  editorUnmounted,
  existingEmail = {},
  forwardedEmail = false,
  caseId,
  constituent,
  contactTypes,
  customFieldValues,
  caseDetails,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { connections } = constituent;

  const [contactType, setContactType] = useState();
  const [selectedContact, setSelectedContact] = useState();

  const [customFieldsAsMergeCodes] = useGetCustomFieldMergeCodeList({
    customFieldValues,
    caseCategory: caseDetails?.status,
    caseStatus: caseDetails?.category,
  });

  if (!contactType || !selectedContact)
    return (
      <React.Fragment>
        <h3>{iln.gettext("Who do you want to send an email to?")}</h3>
        <EmailContactTypeList
          constituent={constituent}
          contactTypes={contactTypes}
          onContactTypeSelect={(contactType) => {
            setContactType(contactType);
            // If someone else is selected, return blank email.
            if (contactType.id === someoneElseTypeID) {
              setSelectedContact({ email: [""] });
            }
            if (
              contactType.id === constituentTypeID ||
              contactType.id === organisationTypeID
            ) {
              // If the constituent doesn't have multiple email addresses and no connections
              // Skip selecting a contact step and open the email editor
              if (connections.length === 0 && constituent.email.length < 2) {
                setSelectedContact(constituent);
              }
            }
          }}
        />
        {contactType && (
          <EmailContactSelect
            constituent={constituent}
            contactType={contactType}
            onContactSelect={setSelectedContact}
          />
        )}
      </React.Fragment>
    );

  return (
    <div className={classes.writeEmail}>
      <ComposeEmail
        recipient={selectedContact}
        additionalMergeCodes={customFieldsAsMergeCodes}
        emailSaved={emailSaved}
        emailSent={emailSent}
        constituent={constituent}
        forwardedEmail={forwardedEmail}
        caseId={caseId}
        unmounted={editorUnmounted}
        email={{
          ...BlankEmail,
          ...existingEmail,
          // composeEmail.jsx expects emails as an object {name, email}
          to: selectedContact.email.map((email) => ({
            email: email.value,
          })),
        }}
      />
    </div>
  );
};

WriteEmail.propTypes = propTypes;

export default WriteEmail;
