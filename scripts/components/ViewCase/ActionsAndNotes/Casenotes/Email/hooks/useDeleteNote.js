import DeleteCasenote from "../../DeleteCasenote/DeleteCasenote.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import { TranslationContext } from "context/translate";
import { useContext } from "react";
import { useReduxSlice } from "../Email.redux";

export const useDeleteNote = (casenote, index) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { removeCasenote } = useReduxSlice();

  const { detail, id } = casenote;
  const charLimit = 20;
  const deleteModalID = `delete_note_${id}`;

  const confirmationValue =
    detail.subject?.length > charLimit
      ? detail.subject.slice(0, charLimit) + "..."
      : detail.subject;

  const confirmMessage = (
    <React.Fragment>
      {iln.gettext(
        `Are you sure you want to delete the ${detail?.type} email with subject line:`
      )}
      <p>{confirmationValue}</p>
      <p>
        <b>
          {iln.gettext(
            "Please enter the subject line as written above to confirm:"
          )}
        </b>
      </p>
    </React.Fragment>
  );

  const handleDeleteNote = () =>
    modalActions.add({
      id: deleteModalID,
      title: iln.gettext("Delete Email"),
      component: (
        <DeleteCasenote
          failureMessage={iln.gettext(
            "There was an error while trying to delete the email"
          )}
          removeCasenote={() => removeCasenote(index)}
          casenote={casenote}
          successMessage={iln.gettext("Draft Email Successfully Deleted")}
          confirmMessage={confirmMessage}
          confirmationValue={confirmationValue}
          modalID={deleteModalID}
          modifyInputValues={(value) => value.replaceAll("...", "").trim()}
        />
      ),
    });

  return [handleDeleteNote];
};
