import {
  Button,
  FlexBox,
  ModalContext,
  NotificationBox,
  Switcher,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect, useState } from "react";
import {
  installationPreferences,
  userPreferences,
} from "../../../../../../../../helpers/localStorageHelper.js";

import ComponentLoading from "../../../../../../../ComponentLoading.jsx";
import OverBulkSendLimit from "./OverBulkSendLimit/OverBulkSendLimit.jsx";
import ScheduleSend from "./ScheduleSend/ScheduleSend.jsx";
import SendTestEmail from "./SendTestEmail/SendTestEmail.jsx";
import { TranslationContext } from "context/translate";
import WriteEmail from "./WriteEmail/WriteEmail.jsx";
import api from "@electedtech/api";
import customFieldsAsMergeCodes from "../../../../../../../common/CustomFields/util/customFieldsAsMergeCodes";
import getUserEmailSignature from "../../../../../../../../helpers/getUserEmailSignature.js";
import propTypes from "./BulkSendEmail.propTypes.js";

const fromAddress = userPreferences.altSendIsPrimary
  ? userPreferences.altSendEmailAs[0]
  : installationPreferences.defaultEmailAddress;

const replaceOrInsertSignature = (body, newSignature) => {
  var newContent = document.createElement("div");
  newContent.innerHTML = body;
  const sigContainer = newContent.getElementsByClassName("signature-container");
  if (sigContainer.length > 0) {
    sigContainer[0].innerHTML = newSignature;
  } else {
    newContent.innerHTML += `<br/><br/><div class="signature-container">${newSignature}</div>`;
  }
  return newContent.innerHTML;
};

const BulkSendEmail = ({ state, onBackClick, refreshResults, closeModal }) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [view, setView] = useState("writeEmail");
  /**
   * The email lives in two pieces of state
   * Body: This contains only the body of the email.
   * EmailDetails: This contains all the details of the email, but not the body.
   *
   * The emails body has a timeout on its onChange event and would result in
   * the other fields being overwritten by a previous state.
   */
  const [emailDetails, setEmailDetails] = useState({
    subject: "",
    from: fromAddress,
  });
  const [body, setBody] = useState(
    `<br/><br/><div class="signature-container">${
      getUserEmailSignature(fromAddress).signature
    }</div><br/><br/>`
  );
  const [recipientCount, setRecipientCount] = useState();
  const [fetching, setFetching] = useState(true);
  const [attachments, setAttachments] = useState();
  const [attachmentPayload, setAttachmentPayload] = useState();

  const {
    filters: { categorytypeID },
  } = state;

  const filters = {
    ...state.filters,
    return: "emailCount",
    constituentCriteria: {
      ...state.filters.constituentCriteria,
      mustHaveEmail: true,
      deceased: false,
      excludeDoNotContactTypeID: [1, 4],
    },
  };

  const customFieldMergeCodes = customFieldsAsMergeCodes(categorytypeID);

  useEffect(() => {
    api.searchCases(filters, modalActions, iln).then(({ emailCount }) => {
      setRecipientCount(emailCount);
      setFetching(false);
    });
  }, []);

  // watch email.from and update signature accordingly
  // if signature not found insert a new one
  useEffect(() => {
    const newSig = getUserEmailSignature(emailDetails.from).signature;
    setEmailDetails((emailState) => ({
      ...emailState,
      body: replaceOrInsertSignature(emailState.body, newSig),
    }));
  }, [emailDetails.from]);

  if (!fetching && recipientCount === 0) {
    return (
      <div>
        <h3>{iln.gettext("No recipients found")}</h3>
        <NotificationBox
          type={"info"}
          alertMessage={iln.gettext(
            "There are no recipients that match the filter criteria you have selected."
          )}
        />
        <FlexBox hAlign={"space-between"}>
          <Button onClick={() => onBackClick()}>{iln.gettext("Back")}</Button>
          <Button onClick={() => closeModal()}>{iln.gettext("Close")}</Button>
        </FlexBox>
      </div>
    );
  }

  if (fetching || !recipientCount) return <ComponentLoading />;

  if (recipientCount > installationPreferences.bulkSendLimit) {
    return <OverBulkSendLimit recipientCount={recipientCount} />;
  }

  return (
    <Switcher selected={view}>
      {{
        writeEmail: (
          <WriteEmail
            onBackClick={onBackClick}
            refreshResults={refreshResults}
            closeModal={closeModal}
            filters={filters}
            recipientCount={recipientCount}
            attachments={attachments}
            setAttachments={setAttachments}
            attachmentPayload={attachmentPayload}
            setAttachmentPayload={setAttachmentPayload}
            email={{ ...emailDetails, body }}
            setEmail={setEmailDetails}
            setBody={setBody}
            setView={setView}
            additionalMergeCodes={customFieldMergeCodes}
          />
        ),
        sendTestEmail: (
          <SendTestEmail setView={setView} email={{ ...emailDetails, body, attachments: attachmentPayload  }} />
        ),
        scheduleSend: (
          <ScheduleSend
            handleOnBack={() => setView("writeEmail")}
            recipientCount={recipientCount}
            email={{ ...emailDetails, body }}
            filters={filters}
            closeModal={closeModal}
          />
        ),
      }}
    </Switcher>
  );
};

BulkSendEmail.propTypes = propTypes;

export default BulkSendEmail;
