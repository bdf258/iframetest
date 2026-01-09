import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";
import {
  constituentTypeID,
  organisationTypeID,
} from "../consts/contactTypeIDs.js";

import LetterContactSelect from "./LetterContactSelect/LetterContactSelect.jsx";
import LetterContactTypeList from "./LetterContactTypeList";
import LetterDetails from "./LetterDetails";
import LetterEditor from "../../LetterEditor/LetterEditor.jsx";
import { TranslationContext } from "context/translate";
import { addressedToFromContact } from "./helpers/addressedToFromContact";
import propTypes from "./WriteLetter.propTypes.js";
import useContactDataSource from "./hooks/useContactDataSource";
import useGetCustomFieldMergeCodeList from "../../../../hooks/useGetCustomFieldMergeCodeList.js";
import { useWriteLetterState } from "./hooks/useWriteLetterState";

const WriteLetter = ({
  letterSaved,
  sendViaEmail,
  editorUnmounted,
  constituent,
  caseId,
  caseDetails,
  customFieldValues,
}) => {
  const iln = useContext(TranslationContext);

  const [
    {
      contactType,
      selectedContact,
      step,
      openLetterEditor,
      letterDetails,
      dataSourceType,
    },
    {
      setContactType,
      setSelectedContact,
      resetSelectedContact,
      setStep,
      setLetterDetails,
      setAddressedTo,
      resetState,
      setLetterTemplateName,
      setDataSourceType,
      setOpenLetterEditor,
    },
  ] = useWriteLetterState();

  const [customFieldsAsMergeCodes] = useGetCustomFieldMergeCodeList({
    customFieldValues,
    caseCategory: caseDetails?.status,
    caseStatus: caseDetails?.category,
  });

  const [contactsDataSource] = useContactDataSource(
    dataSourceType,
    contactType,
    constituent
  );

  if (openLetterEditor)
    return (
      <LetterEditor
        letterheadId={letterDetails.letterheadId}
        letterSaved={letterSaved}
        sendViaEmail={sendViaEmail}
        recipient={selectedContact}
        caseId={caseId}
        constituent={constituent}
        letterRef={letterDetails.letterRef}
        letterTemplateId={letterDetails.letterTemplateId}
        onUnmount={editorUnmounted}
        additionalMergeCodes={customFieldsAsMergeCodes}
      />
    );

  if (step.stepOne) {
    return (
      <React.Fragment>
        <h3>{iln.gettext("Who do you want to write a letter to?")}</h3>
        <LetterContactTypeList
          constituent={constituent}
          onContactTypeSelect={(contactType) => {
            setContactType(contactType);
            setLetterTemplateName(contactType.default_template_name);
            setDataSourceType("contactList");
            resetSelectedContact();

            if (
              contactType.id === constituentTypeID ||
              contactType.id === organisationTypeID
            ) {
              setDataSourceType("constituent");
              // If the constituent has no connections skip to step 2
              if (
                !constituent?.connections ||
                constituent?.connections.length === 0
              ) {
                setAddressedTo(addressedToFromContact(constituent));
                setSelectedContact(constituent);
                setStep("stepTwo");
              }
            }
          }}
        />
        {contactType && (
          <LetterContactSelect
            dataSource={contactsDataSource}
            contactType={contactType}
            onContactSelect={({ value }) => {
              setSelectedContact(value);
              setAddressedTo(addressedToFromContact(value));
              setStep("stepTwo");
            }}
          />
        )}
      </React.Fragment>
    );
  }

  if (step.stepTwo) {
    return (
      <React.Fragment>
        <LetterDetails
          letterDetails={letterDetails}
          onLetterDetailsChange={(letterDetails) => {
            setLetterDetails(letterDetails);
          }}
        />
        <FlexBox hAlign={"space-between"}>
          <Button
            onClick={() => {
              resetState();
            }}
          >
            {iln.gettext("Back")}
          </Button>
          <Button
            isDisabled={
              !letterDetails.letterTemplateId ||
              !letterDetails.letterheadId ||
              !letterDetails.letterRef
            }
            onClick={() => setOpenLetterEditor(true)}
          >
            {iln.gettext("Next")}
          </Button>
        </FlexBox>
      </React.Fragment>
    );
  }
};

WriteLetter.propTypes = propTypes;

export default WriteLetter;
