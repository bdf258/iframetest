import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../context/translation/TranslationContext.js";
import proptypes from "./propTypes.js";
import useForwardEmailInSlider from "../../../../../../../../common/Email/hooks/Forward/useForwardEmailInSlider.js";
import { useIsSliderOpen } from "../../../../../ItemList/common/useIsSliderOpen.js";
import useOpenUpdateCaseDetailsModal from "../../../../../../../hooks/useOpenUpdateCaseDetailsModal.js";
import { useReduxSlice } from "./Forward.redux.js";

const Forward = ({ email, constituent }) => {
  const iln = useContext(TranslationContext);

  const isSliderOpen = useIsSliderOpen();
  const openUpdateCaseDetails = useOpenUpdateCaseDetailsModal();
  const { contactTypes, cases } = useReduxSlice();

  const { caseID, id: emailID } = email;
  const { customFields, ...caseDetails } = cases[caseID] || {};

  const handleEmailSaved = () => {
    // doesn't need to do anything, to see this reply slider you're seeing
    // inbound email not drafts, so no need to update the current state
  };
  const handleEmailSent = () => {
    openUpdateCaseDetails(email);
  };
  const handleEmailEditorUnmounted = () => {};

  const [forwardEmail] = useForwardEmailInSlider({
    caseId: caseID,
    customFieldValues: customFields,
    emailId: emailID,
    emailToForward: email,
    constituent,
    handleEmailSaved,
    handleEmailSent,
    handleEmailEditorUnmounted,
    contactTypes,
    caseDetails,
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
      onClick={forwardEmail}
    >
      {iln.gettext("Forward")}
    </Button>
  );
};

Forward.propTypes = proptypes;

export default Forward;
