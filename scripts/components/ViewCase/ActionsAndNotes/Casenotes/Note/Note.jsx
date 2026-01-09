import {
  Button,
  ModalContext,
  SliderContext,
} from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CasenoteCard from "../CasenoteCard/CasenoteCard.jsx";
import DeleteCasenote from "../DeleteCasenote/DeleteCasenote.jsx";
import NoteIcon from "../../../../common/icons/NoteIcon.jsx";
import { TranslationContext } from "context/translate";
import WriteNote from "../../CasenoteCreators/WriteNote/WriteNote.jsx";
import propTypes from "./propTypes";
import { useReduxSlice } from "../../CasenoteCreators/CasenoteCreators.redux.js";
import { useStyles } from "./styles";

const charLimit = 20;

const Note = ({
  casenote,
  title,
  updateCasenote,
  autoUpdateCasenote,
  removeCasenote,
}) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);
  const { addCasenote, setSelectedNote, selectedNote, removeSelectedNote } =
    useReduxSlice();

  const deleteModalID = `delete_note_${casenote.id}`;
  const confirmationValue =
    casenote.note.length > charLimit
      ? casenote.note.slice(0, charLimit) + "..."
      : casenote.note;
  const confirmMessage = (
    <React.Fragment>
      <p>
        {iln.gettext("Are you sure you want to delete the note with content:")}
      </p>
      <b>{confirmationValue}</b>
      <p>
        {iln.gettext("Please enter the extract as written above to confirm:")}
      </p>
    </React.Fragment>
  );

  return (
    <CasenoteCard
      id={casenote.id}
      title={iln.gettext(title)}
      icon={<NoteIcon />}
      main={<div className={classes.note}>{casenote.note}</div>}
      right={
        <React.Fragment>
          {selectedNote !== casenote.id && (
            <React.Fragment>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={() => {
                  setSelectedNote(casenote.id);
                  sliderActions.open({
                    title: iln.gettext("Edit Note"),
                    component: (
                      <WriteNote
                        key={`edit-note-${casenote.id}`}
                        caseID={casenote.caseID}
                        existingNote={casenote}
                        addCasenoteToState={addCasenote}
                        updateCasenote={updateCasenote}
                        autoUpdateCasenote={autoUpdateCasenote}
                      />
                    ),
                    onClose: () => removeSelectedNote(),
                  });
                }}
              >
                {iln.gettext("Edit")}
              </Button>
              <Button
                className={classes.actionButton}
                size="small"
                onClick={() =>
                  modalActions.add({
                    id: deleteModalID,
                    title: iln.gettext("Delete note"),
                    component: (
                      <DeleteCasenote
                        removeCasenote={removeCasenote}
                        casenote={casenote}
                        successMessage={iln.gettext(
                          "Note Successfully Deleted"
                        )}
                        confirmMessage={confirmMessage}
                        failureMessage={iln.gettext(
                          "There was an error while trying to delete the Note"
                        )}
                        modalID={deleteModalID}
                        confirmationValue={confirmationValue}
                        modifyInputValues={(value) =>
                          value
                            .replace(/[\r\n]+/g, " ")
                            .replaceAll("...", "")
                            .trim()
                        }
                      />
                    ),
                  })
                }
              >
                {iln.gettext("Delete")}
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      }
    />
  );
};

Note.propTypes = propTypes;

export default Note;
