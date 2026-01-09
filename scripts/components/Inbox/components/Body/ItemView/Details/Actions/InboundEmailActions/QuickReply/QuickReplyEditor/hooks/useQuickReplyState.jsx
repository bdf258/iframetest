import {
  caseTypes,
  getPreviousQuickReplyFields,
  setPreviousQuickReplyFields,
} from "../../../../../../../../../../../helpers/localStorageHelper.js";
import { useEffect, useReducer } from "react";

import { getFromAddress } from "../../../../../../../../../../common/ComposeEmail/common/getFromAddress.js";
import getNameAndAddressFromEmail from "../../../../../../../../../helpers/getNameAndAddressFromEmail.js";
import useGetEmailTemplates from "./useGetEmailTemplates.jsx";
import useReplySeparator from "./useReplySeparator.jsx";

const updateLocalStorage = (payload) =>
  setPreviousQuickReplyFields({ ...getPreviousQuickReplyFields(), ...payload });

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_TEMPLATES": {
      return { ...state, emailTemplates: payload };
    }
    case "SET_SUBJECT": {
      return { ...state, subject: payload };
    }
    case "SET_CASE_TYPE": {
      return { ...state, selectedCaseType: payload };
    }
    case "SET_TAGS": {
      return { ...state, tags: payload };
    }
    case "SET_BODY": {
      return { ...state, emailBody: payload };
    }
    case "SET_REPLY_FROM": {
      updateLocalStorage({ replyFrom: payload });
      return { ...state, replyFrom: payload };
    }
    case "SET_SELECTED_EMAIL_TEMPLATE": {
      return { ...state, selectedTemplate: payload };
    }
    case "SET_LOADING_PLACEHOLDER": {
      return { ...state, loadingPlaceholder: payload };
    }
    case "SET_DISPLAY_OVERLAY": {
      return { ...state, overlay: payload };
    }
    case "SET_OVERLAY_TEXT": {
      return { ...state, overlayText: payload };
    }
    case "SET_DISPLAY_CREATE_CONSTITUENT": {
      return { ...state, displayCreateConstituent: payload };
    }
    case "SET_SELECTED_CONSTITUENT": {
      return { ...state, selectedConstituent: payload };
    }
    case "SET_NEW_CONSTITUENT": {
      return { ...state, newConstituent: payload };
    }
    case "SET_CASE_ID": {
      return { ...state, caseId: payload };
    }
    case "SET_EMAIL_ID": {
      return { ...state, emailId: payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const useQuickReplyState = (email) => {
  const [emailTemplates] = useGetEmailTemplates();
  const [replySeparator] = useReplySeparator(email);
  const { firstName, surname } = getNameAndAddressFromEmail(
    email.from,
    email.to
  );

  const [state, dispatch] = useReducer(reducer, {
    selectedCaseType: caseTypes[0].id,
    caseTypes,
    caseId: undefined,
    selectedTemplate: undefined,
    emailId: email.id,
    replyTo: email?.from?.email,
    subject: email?.subject ? `Re: ${email.subject}` : "",
    replyFrom: getFromAddress(),
    emailTemplates: [],
    tags: [],
    emailBody: replySeparator,
    replySeparator,
    loadingPlaceholder: true,
    overlay: false,
    overlayText: "",
    displayCreateConstituent: false,
    newConstituent: false,
    constituentDetails: { firstName, surname },
    ...getPreviousQuickReplyFields(),
  });

  useEffect(() => {
    if (!emailTemplates) return;
    dispatch({
      type: "SET_TEMPLATES",
      payload: emailTemplates,
    });
    dispatch({
      type: "SET_LOADING_PLACEHOLDER",
      payload: false,
    });
  }, [emailTemplates]);

  return [state, dispatch];
};

export default useQuickReplyState;
