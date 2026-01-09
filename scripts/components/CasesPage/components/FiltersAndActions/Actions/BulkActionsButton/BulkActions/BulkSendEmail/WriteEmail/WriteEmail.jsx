/*global CKEDITOR */

import {
  AutoComplete,
  Button,
  FlexBox,
  FormTextInput,
  ModalContext,
  NotificationBox,
  Step,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";
import {
  allowAttachmentsWithBulkEmails,
  allowScheduledEmails,
} from "../../../../../../../../../consts/disabledFeatures.js";
import {
  editorBottomOffset,
  editorTopOffset,
} from "../../../../../../../../common/ComposeEmail/common/sizeConfig";

import ComponentLoading from "../../../../../../../../ComponentLoading.jsx";
import ConfirmationModal from "../../../../../../../../common/Modal/ConfirmationModal/ConfirmationModal.jsx";
import EmailAttachmentInput from "../../../../../../../../common/ComposeEmail/EmailAttachments/EmailAttachmentInput.jsx";
import EmailBody from "../../../../../../../../common/ComposeEmail/EmailBody/EmailBody.jsx";
import EmailFromSelect from "../../../../../../../../common/EmailFromSelect.jsx";
import OperationCompletedModal from "../../../../../../../../common/Modal/OperationCompletedModal/OperationCompletedModal.jsx";
import { TranslationContext } from "context/translate";
import UploadAttachments from "../../../../../../../../common/ComposeEmail/EmailAttachments/UploadAttachments/UploadAttachment.jsx";
import api from "@electedtech/api";
import { bulkEmailMergeCodes } from "../../../../../../../consts/emailMergeCodes";
import { getCurrentCkeditorInstance } from "../../../../../../../../../helpers/ckeditor/getInstance";
import getUserEmailSignature from "../../../../../../../../../helpers/getUserEmailSignature.js";
import propTypes from "./WriteEmail.propTypes.js";
import useStyles from "./WriteEmail.styles.js";
import { useTheme } from "react-jss";

const modalId = "attachmentManagerModal";

const replaceOrInsertSignature = (body, newSignature) => {
  var newContent = document.createElement("div");
  newContent.innerHTML = body;
  const sigContainer = newContent.getElementsByClassName("signature-container");
  if (sigContainer.length > 0) {
    sigContainer[0].innerHTML = newSignature;
  } else {
    newContent.innerHTML += `<br/><br/><div class="signature-container">${newSignature}</div><br/><br>`;
  }
  return newContent.innerHTML;
};

const handleChange = (email, setEmail) => (e) => {
  setEmail({ ...email, [e.target.name]: e.target.value });
};

const applyEmailTemplate = async (email, setEmail, templateID) => {
  const response = await api.getEmailTemplateById(templateID);
  if (response && response.htmlTemplate) {
    const sig = getUserEmailSignature(email.from).signature;

    const emailBody = replaceOrInsertSignature(response.htmlTemplate, sig);

    setEmail({
      ...email,
      body: emailBody,
    });

    const CkeditorInstance = getCurrentCkeditorInstance();

    CkeditorInstance.setData(emailBody);
  }
};

const insertMergeCode = (text) =>
  CKEDITOR &&
  CKEDITOR.instances &&
  CKEDITOR.instances["editor1"] &&
  CKEDITOR.instances["editor1"].insertText(text + " ");

const WriteEmail = ({
  recipientCount,
  email,
  setEmail,
  setBody,
  setView,
  filters,
  refreshResults,
  closeModal,
  additionalMergeCodes = [],
  attachments,
  setAttachments,
  attachmentPayload,
  setAttachmentPayload,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const [step, setStep] = useState(0);
  const [sendStats, setSendStats] = useState();
  const [showMergeCodes, setShowMergeCodes] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [bodyOutOfSync, setBodyOutOfSync] = useState(false);
  const [error, setError] = useState();

  const buttonsDisabled =
    email.subject === "" ||
    email.body === "" ||
    recipientCount === 0 ||
    bodyOutOfSync;

  const buttonsDisabledMessage =
    email.subject === ""
      ? iln.gettext("Subject line cannot be empty")
      : email.body === ""
      ? iln.gettext("Body cannot be empty")
      : recipientCount === 0
      ? iln.gettext("Cannot send to 0 recipients")
      : undefined;

  if (error)
    return (
      <React.Fragment>
        {iln.gettext(
          "There was an error, your bulk email may not have been sent."
        )}
        <br />
        <FlexBox hAlign="center">
          <Button onClick={() => setError(undefined)}>
            {iln.gettext("OK")}
          </Button>
        </FlexBox>
      </React.Fragment>
    );

  return (
    <Stepper step={step}>
      <Step>
        <FlexBox>
          <div>
            <FormTextInput
              name="to"
              label="To"
              value={iln.ngettext(
                "%1 recipient that matches your search criteria",
                "%1 recipients that match your search criteria",
                recipientCount
              )}
              onChange={() => {}}
              keepErrorSpacing={false}
              customClassNames={{ container: classes.spacing }}
            />
            <FormTextInput
              name="subject"
              label={iln.gettext("Subject")}
              value={email.subject}
              onChange={handleChange(email, setEmail)}
              keepErrorSpacing={false}
              customClassNames={{ container: classes.spacing }}
            />
            <EmailFromSelect
              name={iln.gettext("from")}
              label="From"
              value={email.from}
              onChange={handleChange(email, setEmail)}
              keepErrorSpacing={false}
              customClassNames={{ container: classes.spacing }}
            />
            {allowAttachmentsWithBulkEmails && (
              <EmailAttachmentInput
                onChipClick={() => {}}
                onChipRemoved={(e) =>
                  setAttachments(attachments.filter((a) => a.id !== e.id))
                }
                customClassNames={{
                  container: classes.attachmentInputContainer,
                }}
                label={"Attachment"}
                popoverContent={
                  <React.Fragment>
                    <Button
                      customClassNames={classes.attachmentOptionsButton}
                      type={"text"}
                      onClick={() =>
                        modalActions.add({
                          component: (
                            <UploadAttachments
                              modalId={modalId}
                              attachmentUploaded={(attachment) => {
                                // can only be one attachment and id is just to satisfy prop requirement not used anywhere.
                                setAttachments([{ ...attachment, id: 1 }]);
                              }}
                              type="bulkEmail"
                              setAttachmentPayload={setAttachmentPayload}
                              submitButtonText={iln.gettext("Attach File")}
                            />
                          ),
                          title: iln.gettext("Upload Attachment"),
                          id: modalId,
                        })
                      }
                    >
                      {iln.gettext("From my computer")}
                    </Button>
                  </React.Fragment>
                }
                attachments={attachments}
              />
            )}
            <AutoComplete
              labelKey="name"
              clearInputOnResultClick
              dataSource={(searchText) =>
                api.searchEmailTemplates({
                  term: searchText,
                  active: true,
                  columnsToReturn: ["id", "name"],
                })
              }
              placeholder={iln.gettext("Type to search templates")}
              onResultClick={(result) =>
                applyEmailTemplate(email, setEmail, result.id)
              }
              customClassNames={{ container: classes.autoComplete }}
            />
            <br />
            <EmailBody
              emailBody={email.body}
              fromAddress={email.from}
              handleOnChange={(e) => setBody(e.target.value)}
              dirty={() => {}}
              customClassNames={{ container: classes.ckeditor }}
              setBodyOutOfSync={setBodyOutOfSync}
              editorTopOffset={editorTopOffset}
              editorBottomOffset={editorBottomOffset}
            />
            <FlexBox className={classes.buttonRow} hAlign="space-between">
              <div style={{ lineHeight: "40px" }}>
                <Button
                  type="text"
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => {
                    setShowMergeCodes(!showMergeCodes);
                  }}
                >
                  {showMergeCodes
                    ? iln.gettext("Hide Merge Codes")
                    : iln.gettext("Show Merge Codes")}
                </Button>
                {" - "}
                <Button
                  type="text"
                  style={{ fontSize: "0.9rem" }}
                  isDisabled={buttonsDisabled}
                  title={buttonsDisabledMessage}
                  onClick={() => setView("sendTestEmail")}
                >
                  {iln.gettext("Send Test Email")}
                </Button>
              </div>
              <div>
                {allowScheduledEmails && (
                  <Button
                    isDisabled={buttonsDisabled}
                    title={buttonsDisabledMessage}
                    onClick={() => setView("scheduleSend")}
                  >
                    {iln.gettext("Schedule Send")}
                  </Button>
                )}{" "}
                &nbsp;
                <Button
                  isDisabled={buttonsDisabled}
                  title={buttonsDisabledMessage}
                  onClick={() => setStep(1)}
                >
                  {iln.gettext("Send Now")}
                </Button>
              </div>
            </FlexBox>
          </div>
          {showMergeCodes && (
            <div className={classes.mergeCodes}>
              {[...bulkEmailMergeCodes(iln), ...additionalMergeCodes].map(
                (mc, idx) => (
                  <div key={idx} className={classes.mergeCode}>
                    <Button
                      type="text"
                      onClick={() => insertMergeCode(iln.gettext(mc.mergeCode))}
                    >
                      {iln.gettext(mc.mergeCode)}
                    </Button>
                    <span> - {iln.gettext(mc.description)}</span>
                    <br />
                  </div>
                )
              )}
            </div>
          )}
        </FlexBox>
      </Step>

      <Step>
        {fetching ? (
          <ComponentLoading />
        ) : (
          <ConfirmationModal
            message={
              <div>
                <NotificationBox
                  type="alert"
                  alertMessage=" This cannot be undone."
                />
                {iln.gettext("Please confirm you wish to")}{" "}
                <b>{iln.gettext("send this email")}</b>{" "}
                {iln.ngettext(
                  "to %1 constituent by entering the number of recipients below",
                  "to %1 constituents by entering the number of recipients below",
                  recipientCount.toLocaleString()
                )}
                <br />
                <br />
              </div>
            }
            confirmationValue={recipientCount}
            modifyInputValues={(value) => value.replaceAll(",", "")}
            onConfirm={() => {
              setFetching(true);
              api
                .bulkSendEmail(
                  {
                    ...email,
                    attachments: attachmentPayload,
                    caseSearch: {
                      ...filters,
                      resultsPerPage: undefined,
                    },
                  },
                  modalActions,
                  iln
                )
                .then((stats) => {
                  setSendStats(stats);
                  refreshResults();
                  setStep(2);
                })
                .catch((e) => setError(e))
                .finally(() => setFetching(false));
            }}
          />
        )}
      </Step>

      <Step>
        <OperationCompletedModal handleDone={closeModal}>
          <p className={classes.center}>
            {iln.gettext("Your bulk email has been sent")}
          </p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell verticalAlign="middle">
                  {iln.gettext("Total Emails Sent")}
                </TableCell>
                <TableCell
                  verticalAlign="middle"
                  className={classes.resultCell}
                >
                  {iln.gettext(
                    "%1 out of %2 (%3% successful)",
                    sendStats?.emailsSent,
                    sendStats?.total - sendStats?.duplicatesNotSent,
                    (
                      (sendStats?.emailsSent /
                        (sendStats?.total - sendStats?.duplicatesNotSent)) *
                      100
                    ).toFixed(2)
                  )}
                </TableCell>
              </TableRow>
              {sendStats?.duplicatesNotSent > 0 && (
                <TableRow>
                  <TableCell verticalAlign="middle">
                    {iln.gettext("Duplicate Email Addresses ignored")}
                  </TableCell>
                  <TableCell
                    verticalAlign="middle"
                    className={classes.resultCell}
                  >
                    {sendStats?.duplicatesNotSent}
                  </TableCell>
                </TableRow>
              )}
              {sendStats?.failed > 0 && (
                <TableRow>
                  <TableCell verticalAlign="middle">
                    {iln.gettext("Email Addresses failed")}
                  </TableCell>
                  <TableCell
                    verticalAlign="middle"
                    className={classes.resultCell}
                  >
                    <u>{sendStats?.failed}</u>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </OperationCompletedModal>
      </Step>
    </Stepper>
  );
};

WriteEmail.propTypes = propTypes;

export default WriteEmail;
