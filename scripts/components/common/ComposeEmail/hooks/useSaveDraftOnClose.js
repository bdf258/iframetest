import { useContext, useEffect, useRef } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { customFieldsAsMergeCodeMap } from "../../MergeCodes/util/customFieldsAsMergeCodeMap";
import { getCaseRef } from "../common/caseRef";
import { parseTemplate } from "../../MergeCodes/util/mergeCodes";

export const useSaveDraftOnClose = ({
  composeEmailState,
  handleSaveDraft,
  dispatch,
  emailSaved,
  canSaveDraftOnClose,
  unmounted,
  emailSending,
  additionalMergeCodes,
}) => {
  const {
    caseId,
    form,
    emailId,
    lastSavedEmail,
    bodyDirty,
    constituentDetails,
  } = composeEmailState;

  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const constituentDetailsRef = useRef();
  const emailDraftToSaveOnUnmount = useRef();
  const caseRefRef = useRef(getCaseRef(caseId));

  useEffect(() => {
    constituentDetailsRef.current = constituentDetails;
  }, [constituentDetails]);

  useEffect(() => {
    emailDraftToSaveOnUnmount.current = {
      form: {
        ...form,
        body: parseTemplate({
          template: form.body,
          constituentDetails: constituentDetailsRef.current,
          recipientDetails: null,
          additionalMergeCodes:
            customFieldsAsMergeCodeMap(additionalMergeCodes),
          caseRef: caseRefRef.current,
          type: "email",
          iln,
        }),
      },
      emailId,
      caseId,
      lastSavedEmail,
      modalActions,
      bodyDirty,
    };
  }, [form, emailId, lastSavedEmail, modalActions, bodyDirty]);

  useEffect(() => {
    return () => {
      if (canSaveDraftOnClose.current && !emailSending) {
        handleSaveDraft({
          dispatch,
          composeEmailState: emailDraftToSaveOnUnmount.current,
          modalActions,
          iln,
          emailSaved,
          componentUnmounting: true,
          saveAuditTrail: true,
          unmounted,
        });
      }
    };
  }, []);
};
