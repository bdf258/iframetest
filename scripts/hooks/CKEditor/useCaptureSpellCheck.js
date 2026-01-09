/*global CKEDITOR */
import { useEffect } from "react";

/**
 * Browser spell check is not captured by CKEditor, therefore when using spell check the onChange event from CKEditor is not fired.
 * This hook ensures that spellcheck fires the CKEditor onChange when the user inserts a new word.
 * Attaches event to CKEditor native input to listen to "insertReplacementText" (Chrome) or "insertText" (Safari).
 * This then artificially fires the CKEditor onChange event, capturing the inserted text.
 */

const instanceReadyListener = (instance) => {
  instance.editor.editable().$.addEventListener("input", (e) => {
    if (
      e.inputType === "insertReplacementText" ||
      e.inputType === "insertText"
    ) {
      instance.editor.fire("change");
    }
  });
};

export const useCaptureSpellCheck = () => {
  useEffect(() => {
    CKEDITOR.on("instanceReady", instanceReadyListener);

    return () => {
      CKEDITOR.removeListener("instanceReady", instanceReadyListener);
    };
  }, []);
};
