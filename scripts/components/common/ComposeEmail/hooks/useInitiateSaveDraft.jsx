import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { useContext } from "react";
import { useInterval } from "../../../../hooks/useInterval.jsx";

export const useInitiateSaveDraft = ({
  dispatch,
  composeEmailState,
  handleSaveDraft,
  emailSaved,
  emailSending,
  additionalMergeCodes,
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  useInterval(() => {
    !emailSending &&
      handleSaveDraft({
        dispatch,
        composeEmailState,
        modalActions,
        iln,
        emailSaved,
        componentUnmounting: false,
        additionalMergeCodes,
      });
  }, 120000);
};
