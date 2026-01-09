import { useContext, useEffect, useRef } from "react";

import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { getCurrentCkeditorInstance } from "../../../../helpers/ckeditor/getInstance";

const useSaveLetterOnClose = (
  constituentDetails,
  letterSaved,
  saveLetter,
  letterContent = "",
  footerContent = "",
  letterId,
  letterRef,
  caseId,
  letterheadId,
  parseLetter,
  saveLetterOnClose,
  onUnmount
) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const letterToSaveOnClose = useRef();

  /**
   * Saves the letter when the user navigates away from the current page.
   */
  useEffect(() => {
    const saveLetterOnNavigatingAway = async () => {
      const letterToSave = letterToSaveOnClose.current;

      if (!letterToSave) return;

      const {
        letterContent,
        footerContent,
        letterId,
        letterRef,
        caseId,
        letterheadId,
      } = letterToSave;

      if (letterId) {
        await saveLetter(
          letterId,
          caseId,
          letterheadId,
          letterRef,
          letterContent,
          footerContent,
          modalActions,
          iln,
          true
        );
      }
    };

    window.addEventListener("beforeunload", saveLetterOnNavigatingAway);

    return () => {
      window.removeEventListener("beforeunload", saveLetterOnNavigatingAway);
    };
  }, []);

  useEffect(() => {
    if (constituentDetails) {
      const { parsedBody, parsedFooter } = parseLetter(
        letterContent,
        footerContent
      );

      letterToSaveOnClose.current = {
        letterContent: parsedBody,
        footerContent: parsedFooter,
        letterId,
        letterRef,
        caseId,
        letterheadId,
      };
    }
  }, [letterContent, footerContent]);

  useEffect(() => {
    return () => {
      if (!saveLetterOnClose.current) return;
      const letterHasBeenEdited = getCurrentCkeditorInstance()?.checkDirty();
      const letterToSave = letterToSaveOnClose.current;

      // if (!letterHasBeenEdited) return;
      if (!letterToSave) return;

      const {
        letterContent,
        footerContent,
        letterId,
        letterRef,
        caseId,
        letterheadId,
      } = letterToSave;

      if (letterId) {
        saveLetter(
          letterId,
          caseId,
          letterheadId,
          letterRef,
          letterContent,
          footerContent,
          modalActions,
          iln,
          true
        )
          .then((savedLetter) => {
            letterSaved({
              ...savedLetter,
              openUpdateStatusModal: letterHasBeenEdited,
              scrollToNote: true,
            });
            onUnmount && onUnmount();
          })
          .catch(() => onUnmount && onUnmount());
      }
    };
  }, []);
};

export default useSaveLetterOnClose;
