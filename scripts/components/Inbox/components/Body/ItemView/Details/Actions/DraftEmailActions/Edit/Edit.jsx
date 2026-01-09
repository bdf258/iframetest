import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import proptypes from "./Edit.propTypes.js";
import useEditInSlider from "../../../../../../../../common/Email/hooks/Edit/useEditEmailInSlider.js";
import { useIsSliderOpen } from "../../../../../ItemList/common/useIsSliderOpen.js";
import useOpenUpdateCaseDetailsModal from "../../../../../../../hooks/useOpenUpdateCaseDetailsModal.js";
import { useReduxSlice } from "./Edit.redux.js";

const Reply = ({ email, constituent }) => {
  const iln = useContext(TranslationContext);

  const { updateDraftEmail, removeSentDraftEmail } = useReduxSlice();
  const openUpdateCaseDetails = useOpenUpdateCaseDetailsModal();

  const isSliderOpen = useIsSliderOpen();

  const { caseID, id: emailID } = email;

  const handleEmailSaved = (savedEmail) => updateDraftEmail(savedEmail);
  const handleEmailSent = (sentEmail) => {
    openUpdateCaseDetails(sentEmail);
    removeSentDraftEmail(email);
  };
  const handleEmailEditorUnmounted = () => {};

  const [editEmail] = useEditInSlider({
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
      onClick={editEmail}
    >
      {iln.gettext("Edit")}
    </Button>
  );
};

Reply.propTypes = proptypes;

export default Reply;
