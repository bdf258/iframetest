import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import proptypes from "./propTypes.js";
import { useIsSliderOpen } from "../../../../../ItemList/common/useIsSliderOpen.js";
import useOpenUpdateCaseDetailsModal from "../../../../../../../hooks/useOpenUpdateCaseDetailsModal.js";
import useReplyInSlider from "../../../../../../../../common/Email/hooks/Reply/useReplyEmailInSlider.js";

const Reply = ({ email, constituent }) => {
  const iln = useContext(TranslationContext);

  const isSliderOpen = useIsSliderOpen();
  const openUpdateCaseDetails = useOpenUpdateCaseDetailsModal();

  const { caseID, id: emailID } = email;

  const handleEmailSaved = () => {
    // doesn't need to do anything, to see this reply slider you're seeing
    // inbound email not drafts, so no need to update the current state
  };
  const handleEmailSent = () => {
    openUpdateCaseDetails(email);
  };
  const handleEmailEditorUnmounted = () => {};

  const [replyToEmail] = useReplyInSlider({
    caseId: caseID,
    emailId: emailID,
    email,
    constituent,
    handleEmailSaved,
    handleEmailSent,
    handleEmailEditorUnmounted,
  });

  return (
    <Button
      size="small"
      isDisabled={isSliderOpen}
      title={
        isSliderOpen
          ? iln.gettext("You cannot take an action while the slider is open")
          : undefined
      }
      onClick={replyToEmail}
    >
      {iln.gettext("Reply")}
    </Button>
  );
};

Reply.propTypes = proptypes;

export default Reply;
