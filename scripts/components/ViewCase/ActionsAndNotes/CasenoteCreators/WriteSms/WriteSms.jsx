import React, { useContext, useState } from "react";

import ContactTypeList from "../../../../common/CreateCommunication/ContactTypeList";
import SmsEditor from "./SmsEditor/SmsEditor.jsx";
import { TranslationContext } from "context/translate";
import createDirectContactTypeOption from "../../../../common/CreateCommunication/helpers/createDirectContactTypeOption";
import { installationSmsNumber } from "../util/installationSmsNumber";
import { someoneElseTypeID } from "../../../../common/CreateCommunication/consts/contactTypeIDs";
import { useNavigateToSmsEditor } from "./hooks/useNavigateToSmsEditor";
import { useRecipientMobile } from "./hooks/useRecipientMobile";
import { useReduxSlice } from "./WriteSms.redux";
import useSendSms from "../../../hooks/useSendSms";

const WriteSms = () => {
  const [contact, setContact] = useState();

  const iln = useContext(TranslationContext);
  const [sendSms] = useSendSms();

  const { caseId, constituent } = useReduxSlice();

  const contactList = [
    ...[createDirectContactTypeOption(constituent, iln)],
    {
      id: someoneElseTypeID,
      name: iln.gettext("Someone Else"),
    },
  ];

  const smsFromNumber = installationSmsNumber();

  useNavigateToSmsEditor(setContact, contactList);
  const recipientMobile = useRecipientMobile(contact);

  return (
    <React.Fragment>
      {!contact && (
        <ContactTypeList
          contactTypes={contactList}
          onContactTypeSelect={(contactType) => setContact(contactType)}
        />
      )}

      {contact && (
        <SmsEditor
          recipientMobile={recipientMobile}
          handleSendSms={({ message, recipientMobile }) =>
            sendSms({
              id: null,
              caseID: caseId,
              from: smsFromNumber.toString(),
              to: recipientMobile,
              body: message,
            })
          }
        />
      )}
    </React.Fragment>
  );
};

export default WriteSms;
