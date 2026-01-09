import React, { useContext } from "react";

import DeleteCasenote from "../../DeleteCasenote/DeleteCasenote.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { useReduxSlice } from "../Letter.redux";

export const useDeleteLetter = (casenote, index) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);

  const { removeCasenote } = useReduxSlice();

  const charLimit = 20;
  const deleteModalID = `delete_note_${casenote.id}`;
  const confirmationValue =
    casenote.detail.reference.length > charLimit
      ? casenote.detail.reference.slice(0, charLimit) + "..."
      : casenote.detail.reference;

  const handleDeleteLetter = () => {
    modalActions.add({
      id: deleteModalID,
      title: iln.gettext("Delete Letter"),
      component: (
        <DeleteCasenote
          removeCasenote={removeCasenote}
          casenote={casenote}
          index={index}
          successMessage={iln.gettext("Letter Successfully Deleted")}
          confirmMessage={
            <React.Fragment>
              <p>
                {iln.gettext(
                  "Are you sure you want to delete the letter with reference:"
                )}
              </p>
              <b>{confirmationValue}</b>
              <p>
                {iln.gettext(
                  "Please enter the letter reference as written above to confirm:"
                )}
              </p>
            </React.Fragment>
          }
          failureMessage={iln.gettext(
            "There was an error while trying to delete the Letter"
          )}
          confirmationValue={confirmationValue}
          modalID={deleteModalID}
          modifyInputValues={(value) => value.replaceAll("...", "").trim()}
        />
      ),
    });
  };

  return [handleDeleteLetter];
};
