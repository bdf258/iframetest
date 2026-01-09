import { useEffect, useRef } from "react";

const useSaveLetterOnInit = (
  saveLetter,
  caseId,
  letterId,
  letterheadId,
  letterRef,
  letterContent,
  footerContent,
  letterSaved,
  dispatch,
  modalActions,
  iln,
  templateParsed
) => {
  let hasLetterSavedAtLeastOnce = useRef(false);

  useEffect(() => {
    (async () => {
      if (templateParsed === undefined) return;
      if (hasLetterSavedAtLeastOnce.current) return;
      try {
        dispatch({
          type: "SET_SAVING_LETTER",
          saving: true,
        });
        hasLetterSavedAtLeastOnce.current = true;
        const savedLetter = await saveLetter(
          letterId,
          caseId,
          letterheadId,
          letterRef,
          letterContent,
          footerContent,
          modalActions,
          iln
        );
        dispatch({
          type: "SET_LETTER_ID",
          letterId: savedLetter.id,
        });
        dispatch({
          type: "SET_SAVING_LETTER",
          saving: false,
        });
      } catch (e) {
        hasLetterSavedAtLeastOnce.current = false;
        dispatch({
          type: "SET_SAVING_LETTER",
          saving: false,
        });
      }
    })();
  }, [letterContent]);
};

export default useSaveLetterOnInit;
