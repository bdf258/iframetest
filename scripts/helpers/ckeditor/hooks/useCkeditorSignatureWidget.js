import { useEffect, useRef } from "react";

export const useCkeditorSignatureWidget = (
  hasInstance,
  currentInstance,
  emailBody
) => {
  const hasInitialisedSignatureBlock = useRef(false);

  useEffect(() => {
    if (hasInstance) {
      const CkeditorInstance = currentInstance;
      CkeditorInstance.widgets.initOn(
        CkeditorInstance.document.findOne(".signature-container"),
        "signatureblock"
      );
    }
  }, []);

  /*
    CKEDITOR dirty flag set to true by Signature block widget.
    Initialises signature block
    Should only fire once (useRef), when CKEditor is ready.
    Resets the dirty property on CKEditor as the plugin
    for initialising and inserting the signature block sets
    the CKEditor dirty to true
    This is solely for draft email being saved if not edited.
   */
  useEffect(() => {
    if (
      hasInstance &&
      currentInstance &&
      !hasInitialisedSignatureBlock.current
    ) {
      window.initSignatureBlock(currentInstance);
      hasInitialisedSignatureBlock.current = true;
      currentInstance.resetDirty();
    }
  }, [emailBody]);
};
