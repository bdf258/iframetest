import DeleteCasenote from "../../DeleteCasenote/DeleteCasenote.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { useContext } from "react";
import { useReduxSlice } from "../Email.redux";

export const useCancelScheduled = (casenote, index) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { removeCasenote } = useReduxSlice();

  const handleCancelScheduled = async () => {
    let noOfEmails = await api.noOfScheduledEmails(
      casenote.detail.id,
      modalActions,
      iln
    );
    if (!noOfEmails) return;
    noOfEmails = noOfEmails.count;

    const confirmMessage = (
      <React.Fragment>
        {iln.gettext(
          `You are about to cancel ${noOfEmails} scheduled email${
            noOfEmails > 1 ? "s" : ""
          }`
        )}
        <p>
          <b>
            {iln.gettext(
              "Please enter the number of emails to be cancelled to confirm"
            )}
          </b>
        </p>
      </React.Fragment>
    );

    const cancelScheduledEmail = async () =>
      await api.cancelScheduledEmail(casenote.detail.id, modalActions, iln);

    const deleteModalID = `delete_note_${casenote.id}`;

    modalActions.add({
      id: deleteModalID,
      title: iln.gettext("Delete note"),
      component: (
        <DeleteCasenote
          failureMessage={iln.gettext(
            "There was an error while trying to cancel scheduled email"
          )}
          removeCasenote={() => removeCasenote(index)}
          casenote={casenote}
          successMessage={iln.gettext(
            "Scheduled emails successfully cancelled"
          )}
          confirmMessage={confirmMessage}
          confirmationValue={noOfEmails + ""}
          modalID={deleteModalID}
          modifyInputValues={(value) => value.replaceAll("...", "").trim()}
          actionBeforeDelete={cancelScheduledEmail}
          callDeleteCasenoteApi={false}
        />
      ),
    });
  };

  return [handleCancelScheduled];
};
