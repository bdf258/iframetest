import { useEffect, useReducer } from "react";
import emailRegex from "../../../../consts/emailRegex";
import { removeInvalidEmailAddress } from "../../../ViewCase/helpers/removeInvalidEmailAddresses";
import newlineToBreak from "../../Email/util/newlineToBreak";

import { getCaseRef } from "../common/caseRef";
import { getEmailSubjectCaseRef } from "../common/getEmailSubjectCaseRef";
import { getFromAddress } from "../common/getFromAddress";

const getFormInitialValues = (email, caseId) => {
  const {
    from,
    to,
    cc,
    bcc,
    subject,
    template,
    attachments,
    purifiedBody,
    plainBody,
  } = email;

  return {
    from: getFromAddress(from?.email),
    to: to
      ? getValueAsChipInput(removeInvalidEmailAddress(to))
      : defaultChipInputValue,
    cc: cc
      ? getValueAsChipInput(removeInvalidEmailAddress(cc))
      : defaultChipInputValue,
    bcc: bcc
      ? getValueAsChipInput(removeInvalidEmailAddress(bcc))
      : defaultChipInputValue,
    subject: subject || getEmailSubjectCaseRef(caseId),
    body: getFormBody(purifiedBody, plainBody),
    template: template || null,
    attachments: attachments
      ? getValueForAttachments(attachments)
      : defaultChipInputValue,
  };
};

const getFormBody = (purifiedBody, plainBody) => {
  if (purifiedBody) return purifiedBody;
  if (plainBody) return newlineToBreak(plainBody);
  return "";
};

const getValueAsChipInput = (chips) => ({
  value: "",
  chips: chips.map((chip, idx) => {
    const trimmedEmail = chip.email.trim();
    return {
      label: trimmedEmail,
      id: idx,
      valid: emailRegex.test(trimmedEmail),
    };
  }),
});

const getValueForAttachments = (attachments) => ({
  value: "",
  chips: attachments.map((attachment) => ({
    label: attachment.fileName,
    id: attachment.id,
    emailId: attachment.emailID,
    mimeType: attachment.mimeType,
    size: attachment.size,
    path: attachment.path,
    createdDate: attachment.creationDate,
    description: attachment.description,
  })),
});

const defaultChipInputValue = {
  label: "",
  chips: [],
};

const composeEmailReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_INPUT": {
      const { input } = action;
      return {
        ...state,
        form: { ...state.form, [input.name]: input.value },
      };
    }
    case "SET_EMAIL_ID": {
      return { ...state, emailId: action.emailId };
    }
    case "SET_SENDING": {
      return { ...state, sending: action.sending };
    }
    case "TOGGLE_DISPLAY_MERGE_CODES": {
      return { ...state, displayMergeCodes: !state.displayMergeCodes };
    }
    case "SET_LAST_SAVED_EMAIL": {
      return { ...state, lastSavedEmail: action.lastSavedEmail };
    }
    case "TOGGLE_SHOW_CC": {
      return { ...state, showCc: !state.showCc };
    }
    case "TOGGLE_SHOW_BCC": {
      return { ...state, showBcc: !state.showBcc };
    }
    case "SET_DRAFT_SAVED_TIME_STAMP": {
      return { ...state, draftSavedTimeStamp: action.draftSavedTimeStamp };
    }
    case "SET_BODY_DIRTY": {
      return { ...state, bodyDirty: action.dirty };
    }
    case "SET_DRAFT_SAVED_STATUS": {
      return { ...state, draftSavedStatus: action.draftSavedStatus };
    }
    case "SET_CONSTITUENT": {
      return { ...state, constituentDetails: action.constituentDetails };
    }
    case "SET_DISPLAY_OVERLAY": {
      return { ...state, displayOverlay: action.display };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const useComposeEmailState = (
  email,
  caseId,
  forwardedEmail,
  constituent
) => {
  useEffect(() => {
    if (!constituent) return;
    dispatch({
      type: "SET_CONSTITUENT",
      constituentDetails: constituent,
    });
  }, [constituent]);

  const initialState = {
    sending: false,
    displayMergeCodes: false,
    emailId: email.id || undefined,
    form: getFormInitialValues(email, caseId),
    lastSavedEmail: getFormInitialValues(email, caseId),
    showCc: email?.cc.length > 0,
    showBcc: email?.bcc.length > 0,
    draftSavedTimeStamp: undefined,
    draftSavedStatus: undefined,
    selectedMergeCode: null,
    bodyDirty: undefined,
    caseId,
    forwardedEmail,
    caseRef: getCaseRef(caseId),
    constituentDetails: constituent,
    displayOverlay: false,
  };

  const [composeEmailState, dispatch] = useReducer(
    composeEmailReducer,
    initialState
  );

  return [composeEmailState, dispatch];
};
