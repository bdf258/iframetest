import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext, useRef, useState } from "react";
import {
  editorBottomOffset,
  editorTopOffset,
  minViewPortWidth,
  sliderMinWidth,
} from "./common/sizeConfig";

import BlankEmail from "./consts/BlankEmail";
import { ComposeEmailPlaceHolder } from "./ComposeEmailPlaceHolder.jsx";
import EmailAttachments from "./EmailAttachments/EmailAttachments.jsx";
import EmailBody from "./EmailBody/EmailBody.jsx";
import EmailFromSelect from "../EmailFromSelect.jsx";
import EmailInput from "./EmailInput/EmailInput.jsx";
import EmailSendInProgress from "./EmailSendInProgress/EmailSendInProgress.jsx";
import EmailSubject from "./EmailSubject/EmailSubject.jsx";
import EmailTemplateAutoComplete from "./EmailTemplateAutoComplete/EmailTemplateAutoComplete.jsx";
import MergeCodes from "./../MergeCodes/MergeCodes/MergeCodes.jsx";
import Overlay from "./Overlay/Overlay.jsx";
import SaveNotification from "./SaveNotification/SaveNotification.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { canInitiateSend } from "./common/canInitiateSend";
import { canSaveDraft } from "./common/canSaveDraft";
import classnames from "classnames";
import { customFieldsAsMergeCodeMap } from "../MergeCodes/util/customFieldsAsMergeCodeMap";
import { emailPayloadFromForm } from "./common/emailPayloadFromForm";
import emailRegex from "../../../consts/emailRegex.js";
import { formHasAtLeastOneValue } from "./common/formHasAtLeastOneValue";
import { getCurrentCkeditorInstance } from "../../../helpers/ckeditor/getInstance";
import { hasPermission } from "./common/fromEmailAddresses";
import { parseTemplate } from "../MergeCodes/util/mergeCodes";
import propTypes from "./ComposeEmail.propTypes";
import { useCanSaveDraftOnClose } from "./hooks/useCanSaveDraftOnClose";
import { useCaptureSpellCheck } from "../../../hooks/CKEditor/useCaptureSpellCheck";
import { useCkeditorReady } from "../../../hooks/CKEditor/useCkeditorReady.jsx";
import { useComposeEmailState } from "./hooks/useComposeEmailState";
import useConstituentDetails from "../MergeCodes/hooks/useConstituentDetails.jsx";
import { useDeleteDraftOnClose } from "./hooks/useDeleteDraftOnClose";
import useDuplicateEmailAddressesAcrossToCcBcc from "./hooks/useDuplicateEmailAddressesAcrossToCcBcc";
import useGetMergeCodeMap from "../MergeCodes/hooks/useGetMergeCodeMap.jsx";
import { useInitiateSaveDraft } from "./hooks/useInitiateSaveDraft.jsx";
import useMergeCodesWithContent from "../MergeCodes/hooks/useMergeCodesWithContent.jsx";
import { useRecipientDetails } from "../MergeCodes/hooks/useRecipientDetails.jsx";
import useResizeSlider from "../hooks/useResizeSlider.jsx";
import { useSaveDraftOnClose } from "./hooks/useSaveDraftOnClose";
import { useStyles } from "./ComposeEmail.styles";
import { useTheme } from "react-jss";

const handleSaveDraft = async ({
  dispatch,
  composeEmailState,
  modalActions,
  iln,
  emailSaved,
  componentUnmounting,
  saveAuditTrail = false,
  unmounted,
  additionalMergeCodes = [],
}) => {
  const { lastSavedEmail, form, bodyDirty, caseId } = composeEmailState;

  if (canSaveDraft(lastSavedEmail, form, bodyDirty, caseId)) {
    const savedDraft = await saveDraft({
      dispatch,
      composeEmailState,
      modalActions,
      iln,
      emailSaved,
      additionalMergeCodes,
      componentUnmounting,
      saveAuditTrail,
      unmounted,
    });

    return savedDraft;
  }
};

const saveDraft = async ({
  dispatch,
  composeEmailState,
  modalActions,
  iln,
  emailSaved,
  componentUnmounting,
  saveAuditTrail = false,
  unmounted,
  additionalMergeCodes = [],
}) => {
  const { form, emailId, caseId, constituentDetails, caseRef } =
    composeEmailState;

  const payload = emailPayloadFromForm({
    form,
    emailId,
    caseId,
    constituentDetails,
    additionalMergeCodes,
    caseRef,
    iln,
  });

  const savedEmail = await api[emailId ? "updateDraftEmail" : "saveDraftEmail"](
    { ...payload, autosave: saveAuditTrail },
    modalActions
  );
  emailSaved && emailSaved(savedEmail, false);
  unmounted && unmounted();
  if (!componentUnmounting) {
    dispatch({
      type: "SET_EMAIL_ID",
      emailId: savedEmail.id,
    });
    dispatch({
      type: "SET_LAST_SAVED_EMAIL",
      lastSavedEmail: form,
    });
    dispatch({
      type: "SET_DRAFT_SAVED_TIME_STAMP",
      draftSavedTimeStamp: new Date(),
    });
    return savedEmail;
  }
};

const handleSaveAttachment = async (
  dispatch,
  composeEmailState,
  modalActions,
  iln,
  emailSaved,
  additionalMergeCodes
) => {
  return await saveDraft({
    dispatch,
    composeEmailState,
    modalActions,
    iln,
    emailSaved,
    componentUnmounting: false,
    additionalMergeCodes,
  });
};

const handleSendEmail = async ({
  dispatch,
  composeEmailState,
  modalActions,
  iln,
  emailSaved,
  emailSent,
  additionalMergeCodes,
  setDeleteDraftOnClose,
  canSaveDraftOnClose,
  classes,
  saveAuditTrail = false,
}) => {
  const { form } = composeEmailState;

  if (hasPermission(form.from) && canInitiateSend(form)) {
    dispatch({
      type: "SET_SENDING",
      sending: true,
    });
    try {
      const draft = await saveDraft({
        dispatch,
        composeEmailState,
        modalActions,
        iln,
        emailSaved,
        componentUnmounting: false,
        saveAuditTrail,
        additionalMergeCodes,
      });

      await api.sendEmail(draft.id, modalActions);
      canSaveDraftOnClose.current = false;
      setDeleteDraftOnClose(false);
      emailSent({ ...draft, type: "sent" });
    } catch (e) {
      dispatch({
        type: "SET_SENDING",
        sending: false,
      });
    }
  } else {
    modalActions.add({
      component: (
        <div>
          {iln.gettext(
            "You do not have permission to send an email from this address."
          )}
          <FlexBox hAlign={"center"}>
            <Button onClick={() => modalActions.removeTop()}>
              {iln.gettext("Close")}
            </Button>
          </FlexBox>
        </div>
      ),
      customClassNames: { card: classes.modalCard },
    });
  }
};

const ComposeEmail = ({
  recipient,
  caseId,
  email = BlankEmail,
  emailSent,
  emailSaved,
  forwardedEmail,
  constituent,
  unmounted,
  additionalMergeCodes = [],
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const emailInputsContainerRef = useRef();
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [formattedConstituentDetails] = useConstituentDetails(constituent);
  const [bodyOutOfSync, setBodyOutOfSync] = useState(false);

  const [composeEmailState, dispatch] = useComposeEmailState(
    email,
    caseId,
    forwardedEmail,
    formattedConstituentDetails
  );

  const [recipientDetails] = useRecipientDetails(recipient);

  const {
    sending,
    displayMergeCodes,
    emailId,
    form,
    showCc,
    showBcc,
    draftSavedTimeStamp,
    bodyDirty,
    caseRef,
    constituentDetails,
    displayOverlay,
  } = composeEmailState;

  const [mergeCodeMap] = useGetMergeCodeMap({
    constituentDetails,
    recipientDetails,
    additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
    caseRef,
    type: "email",
    iln,
  });
  const [mergeCodes = []] = useMergeCodesWithContent({
    constituent: constituentDetails,
    recipient: recipientDetails,
    additionalMergeCodes,
    caseId,
    type: "email",
    iln,
  });

  const [canSaveDraftOnClose] = useCanSaveDraftOnClose(composeEmailState);

  useResizeSlider(sliderMinWidth, minViewPortWidth, displayMergeCodes);

  const [setDeleteDraftOnClose] = useDeleteDraftOnClose(
    composeEmailState,
    canSaveDraft
  );

  useInitiateSaveDraft({
    dispatch,
    composeEmailState,
    handleSaveDraft,
    emailSaved,
    sending,
    additionalMergeCodes,
  });

  useSaveDraftOnClose({
    composeEmailState,
    handleSaveDraft,
    dispatch,
    emailSaved,
    canSaveDraftOnClose,
    unmounted,
    emailSending: sending,
    additionalMergeCodes,
  });

  const [ckEditorReady] = useCkeditorReady();
  useCaptureSpellCheck();

  const handleFormChange = (e) => {
    dispatch({
      type: "SET_FORM_INPUT",
      input: { name: e.target.name, value: e.target.value },
    });
  };

  const handleKeyDown = (e) => {
    const keyPressed = e.key;
    const value = e.target.value.value;
    let chips = e.target.value.chips;
    const name = e.target.value.name;
    if (keyPressed === "Backspace" && value === "" && chips.length > 0) {
      chips.pop();
      dispatch({
        type: "SET_FORM_INPUT",
        input: {
          name,
          value: { chips, value: "" },
        },
      });
    }
  };

  const handleOnBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value.value;
    const chips = e.target.value.chips;

    const emailExists = chips.find((chip) => chip.label === value);

    if (!emailExists && value) {
      dispatch({
        type: "SET_FORM_INPUT",
        input: {
          name,
          value: {
            chips: [
              ...chips,
              { label: value, id: value, valid: emailRegex.test(value) },
            ],
            value: "",
          },
        },
      });
    }
  };

  const handleEmailTemplateSelect = async (templateId) => {
    dispatch({
      type: "SET_DISPLAY_OVERLAY",
      display: iln.gettext("Loading template"),
    });
    const emailTemplate = await api.getEmailTemplateById(templateId);

    const CkeditorInstance = getCurrentCkeditorInstance();

    const parsedTemplate = `${parseTemplate({
      template: emailTemplate.htmlTemplate,
      constituentDetails: constituentDetails,
      recipientDetails,
      additionalMergeCodes: customFieldsAsMergeCodeMap(additionalMergeCodes),
      caseRef,
      type: "email",
      iln,
    })}`;

    CkeditorInstance.insertHtml(parsedTemplate);

    dispatch({
      type: "SET_DISPLAY_OVERLAY",
      display: false,
    });
  };

  const [{ toHasDuplicates, ccHasDuplicates, bccHasDuplicates }] =
    useDuplicateEmailAddressesAcrossToCcBcc(form.to, form.cc, form.bcc);

  const handleInsertMergeCode = (mergeCode) => {
    const mergeCodeContent = mergeCodeMap.get(mergeCode) || "";
    const CkeditorInstance = getCurrentCkeditorInstance();
    CkeditorInstance.insertHtml(mergeCodeContent.trim() + " ");
  };

  return (
    <FlexBox>
      <div
        className={classnames(
          classes.composeEmailContainer,
          ckEditorReady ? null : classes.hidden
        )}
      >
        {displayOverlay && <Overlay text={displayOverlay} />}
        <div ref={emailInputsContainerRef}>
          <EmailInput
            hasDuplicates={toHasDuplicates}
            label={iln.gettext("To")}
            name={"to"}
            customClassNames={{
              container: classes.inputContainer,
              errorText: classes.emailInputErrorMessage,
              label: classes.inputLabel,
            }}
            value={form.to}
            onChange={(e) => handleFormChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            onBlur={(e) => handleOnBlur(e)}
            toggleCcInputVisibility={() => {
              dispatch({
                type: "TOGGLE_SHOW_CC",
              });
            }}
            toggleBccInputVisibility={() => {
              dispatch({
                type: "TOGGLE_SHOW_BCC",
              });
            }}
            innerComponent
          />
          {showCc && (
            <EmailInput
              hasDuplicates={ccHasDuplicates}
              label={iln.gettext("Cc")}
              name={"cc"}
              customClassNames={{
                container: classes.inputContainer,
                errorText: classes.emailInputErrorMessage,
                label: classes.inputLabel,
              }}
              value={form.cc}
              onChange={(e) => handleFormChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              onBlur={(e) => handleOnBlur(e)}
            />
          )}
          {showBcc && (
            <EmailInput
              hasDuplicates={bccHasDuplicates}
              label={iln.gettext("Bcc")}
              name={"bcc"}
              customClassNames={{
                container: classes.inputContainer,
                errorText: classes.emailInputErrorMessage,
                label: classes.inputLabel,
              }}
              value={form.bcc}
              onChange={(e) => handleFormChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              onBlur={(e) => handleOnBlur(e)}
            />
          )}
          <EmailSubject
            customClassNames={{
              container: classnames(
                classes.inputContainer,
                classes.inputFontSize
              ),
              label: classnames(classes.inputLabel),
            }}
            value={form.subject}
            onChange={(e) => handleFormChange(e)}
          />
          <EmailTemplateAutoComplete
            customClassNames={{
              container: classnames(
                classes.inputContainer,
                classes.inputFontSize
              ),
              label: classnames(classes.inputLabel),
            }}
            value={form.template}
            onResultClick={({ id }) => handleEmailTemplateSelect(id)}
          />
          <EmailAttachments
            emailId={emailId}
            emailSaved={emailSaved}
            caseId={caseId}
            customClassNames={{
              container: classes.inputContainer,
              label: classes.inputLabel,
            }}
            value={form.attachments}
            onChange={(e) => handleFormChange(e)}
            saveDraft={() => {
              return handleSaveAttachment(
                dispatch,
                composeEmailState,
                modalActions,
                iln,
                emailSaved,
                additionalMergeCodes
              );
            }}
          />
          <EmailFromSelect
            customClassNames={{
              container: classes.inputContainer,
              select: classes.inputFontSize,
              label: classes.inputLabel,
            }}
            label={"From"}
            onChange={(e) => handleFormChange(e)}
            name={"from"}
            value={form.from}
            keepErrorSpacing={false}
          />
        </div>
        <EmailBody
          emailBody={form.body}
          handleOnChange={(e) => handleFormChange(e)}
          fromAddress={form.from}
          dirty={(dirty) => {
            if (dirty === bodyDirty) return;
            dispatch({
              type: "SET_BODY_DIRTY",
              dirty,
            });
          }}
          emailInputsContainerRef={emailInputsContainerRef}
          setBodyOutOfSync={setBodyOutOfSync}
          editorBottomOffset={editorBottomOffset}
          editorTopOffset={editorTopOffset}
        />
        <p className={classes.signatureInfo}>
          {iln.gettext(
            "Signature block is highlighted when you hover over it or when you edit it manually. Please note that anything written in signature block will not be saved."
          )}
        </p>
        <FlexBox hAlign={"space-between"}>
          <FlexBox hAlign={"flex-start"}>
            <Button
              onClick={() =>
                dispatch({
                  type: "TOGGLE_DISPLAY_MERGE_CODES",
                })
              }
            >
              {iln.gettext(`Merge Codes`)}
            </Button>
            &nbsp;
          </FlexBox>

          <SaveNotification draftSavedTimeStamp={draftSavedTimeStamp} />
          <FlexBox hAlign={"flex-end"}>
            <Button
              isDisabled={
                (!formHasAtLeastOneValue(form, caseId) && !bodyDirty) ||
                sending ||
                bodyOutOfSync
              }
              onClick={() =>
                handleSaveDraft({
                  dispatch,
                  composeEmailState,
                  modalActions,
                  iln,
                  emailSaved,
                  componentUnmounting: false,
                  saveAuditTrail: true,
                  additionalMergeCodes,
                })
              }
            >
              {iln.gettext("Save Draft")}
            </Button>
            &nbsp;
            <Button
              isDisabled={!canInitiateSend(form) || sending || bodyOutOfSync}
              onClick={() =>
                handleSendEmail({
                  dispatch,
                  composeEmailState,
                  modalActions,
                  iln,
                  emailSaved,
                  emailSent,
                  additionalMergeCodes,
                  setDeleteDraftOnClose,
                  canSaveDraftOnClose,
                  classes,
                  saveAuditTrail: true,
                })
              }
            >
              {iln.gettext("Send Email")}
            </Button>
          </FlexBox>
        </FlexBox>
      </div>
      <MergeCodes
        displayBarcode={!!constituent?.DPID}
        mergeCodes={mergeCodes}
        type={"email"}
        displayMergeCodes={displayMergeCodes}
        toggleMergeCodeDisplay={() => {
          dispatch({ type: "TOGGLE_DISPLAY_MERGE_CODES" });
        }}
        selectedMergeCode={(mergeCode) => {
          handleInsertMergeCode(mergeCode);
        }}
      />
      {!ckEditorReady && <ComposeEmailPlaceHolder />}
      <EmailSendInProgress loading={sending} />
    </FlexBox>
  );
};

ComposeEmail.propTypes = propTypes;

export default ComposeEmail;
