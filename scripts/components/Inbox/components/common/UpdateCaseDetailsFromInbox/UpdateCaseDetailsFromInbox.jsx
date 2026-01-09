import React, { useContext, useEffect, useState } from "react";

import ComponentLoading from "../../../../ComponentLoading.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import UpdateCaseDetails from "../../../../common/UpdateCaseDetails/index.js";
import api from "@electedtech/api";
import propTypes from "./UpdateCaseDetailsFromInbox.propTypes.js";
import { useReduxSlice } from "./UpdateCaseDetailsFromInbox.redux.js";

const UpdateCaseDetailsFromInbox = ({
  closeModal,
  onModalClose,
  inboxItem,
}) => {
  const { modalActions } = useContext(ModalContext);
  const { iln } = useContext(TranslationContext);

  const [caseDetails, setCaseDetails] = useState();
  const [reviewDates, setReviewDates] = useState();

  const { caseworkers, removeItem } = useReduxSlice();

  useEffect(() => {
    api
      .getReviewDatesForCase(inboxItem.caseID, modalActions, iln)
      .then((reviewDates) =>
        setReviewDates(
          reviewDates.map((detail) => ({
            caseID: inboxItem.caseID,
            type: "reviewDate",
            detail,
          }))
        )
      );

    api
      .getCase(inboxItem.caseID)
      .then((caseDetails) => setCaseDetails(caseDetails));
  }, []);

  if (!caseDetails || !reviewDates) return <ComponentLoading />;

  return (
    <UpdateCaseDetails
      caseworker={caseworkers}
      casenotes={reviewDates}
      addCasenote={(newReviewDate) =>
        setReviewDates([...reviewDates, newReviewDate])
      }
      updateCasenoteByID={({ noteId: id, casenote: newReviewDate }) => {
        const index = reviewDates.findIndex((rd) => rd.detail.id === id);

        if (index !== -1) {
          const updatedReviewDates = reviewDates;
          updatedReviewDates[index] = newReviewDate;
          setReviewDates([...updatedReviewDates]);
        }
      }}
      caseDetails={caseDetails}
      setCaseDetails={setCaseDetails}
      closeModal={closeModal}
      onMarkAsActioned={() => {
        api.updateEmailActioned(inboxItem.id, true, modalActions, iln);
        removeItem(inboxItem);
        closeModal();
      }}
      onModalClose={onModalClose}
    />
  );
};

UpdateCaseDetailsFromInbox.propTypes = propTypes;

export default UpdateCaseDetailsFromInbox;
