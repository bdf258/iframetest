import {
  Button,
  FlexBox,
  FormTextareaInput,
  ModalContext,
  SliderContext,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { differenceInSeconds } from "date-fns";
import propTypes from "./propTypes";
import { useInterval } from "../../../../../hooks/useInterval.jsx";
import { useReduxSlice } from "../CasenoteCreators.redux";
import useResizeSlider from "../../../../common/hooks/useResizeSlider.jsx";
import { useStyles } from "./styles";

const WriteNote = ({
  caseID,
  addCasenoteToState,
  updateCasenote,
  autoUpdateCasenote,
  existingNote,
}) => {
  const classes = useStyles();
  const [existingNoteID, setExistingNoteID] = useState(
    existingNote ? existingNote.id : undefined
  );
  const [note, setNote] = useState(existingNote ? existingNote.note : "");
  const [lastSavedNote, setLastSavedNote] = useState(note);
  const [lastSavedDate, setLastSavedDate] = useState();
  const [timeSinceSaved, setTimeSinceSaved] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const { sliderActions } = useContext(SliderContext);
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const { removeSelectedNote } = useReduxSlice();

  useResizeSlider(600, 1250);

  const createOrUpdateNote = ({
    existingNoteID,
    caseID,
    note,
    addCasenoteToState,
    updateCasenote,
    setExistingNoteID,
    sliderActions,
    modalActions,
    iln,
    changeCaseStatus = false,
    scrollToCasenote = false,
    autoSave,
  }) => {
    if (isSaving) return;
    setIsSaving(true);
    existingNoteID
      ? api
          .updateCasenote(existingNoteID, { note }, modalActions, iln)
          .then((casenote) => {
            (autoSave ? autoUpdateCasenote : updateCasenote)({
              ...casenote,
              openUpdateStatusModal: changeCaseStatus,
            });
            removeSelectedNote();
            setLastSavedNote(note);
            setLastSavedDate(new Date());
            changeCaseStatus && sliderActions && sliderActions.reset();
            setIsSaving(false);
          })
      : api.createNote(caseID, { note }, modalActions, iln).then((casenote) => {
          addCasenoteToState(
            { ...casenote, openUpdateStatusModal: changeCaseStatus },
            scrollToCasenote
          );
          removeSelectedNote();
          setLastSavedNote(note);
          setLastSavedDate(new Date());
          setExistingNoteID && setExistingNoteID(casenote.id);
          changeCaseStatus && sliderActions && sliderActions.reset();
          setIsSaving(false);
        });
  };

  useInterval(() => {
    if (note.trim() !== "" && note !== lastSavedNote)
      createOrUpdateNote({
        existingNoteID,
        caseID,
        note,
        addCasenoteToState,
        updateCasenote,
        setExistingNoteID,
        sliderActions,
        iln,
        modalActions,
        autoSave: true,
      });
  }, 120 * 100);

  useInterval(() => {
    if (isSaving) return;
    if (lastSavedDate) {
      const secondsSinceLastSave = differenceInSeconds(
        new Date(),
        lastSavedDate
      );
      if (secondsSinceLastSave < 60)
        setTimeSinceSaved(iln.gettext("Note saved moments ago"));
      else {
        setTimeSinceSaved(
          iln.ngettext(
            "Note saved %1 minute ago",
            "Note saved %1 minutes ago",
            Math.round(secondsSinceLastSave / 60)
          )
        );
      }
    }
  }, 5 * 1000);

  return (
    <React.Fragment>
      <FormTextareaInput
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        keepErrorSpacing={false}
        customClassNames={{
          input: classes.textareaInput,
          container: classes.textareaContainer,
        }}
      />
      <br />
      <FlexBox
        hAlign="space-between"
        vAlign="center"
        className={classes.saveRow}
      >
        <div>{timeSinceSaved}</div>
        <Button
          isDisabled={note === "" || isSaving}
          onClick={() =>
            createOrUpdateNote({
              existingNoteID,
              caseID,
              note,
              addCasenoteToState,
              updateCasenote,
              setExistingNoteID,
              sliderActions,
              changeCaseStatus: true,
              scrollToCasenote: true,
              iln,
              modalActions,
            })
          }
        >
          {isSaving ? <Spinner scale={0.5} /> : iln.gettext("Save Note")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

WriteNote.propTypes = propTypes;

export default WriteNote;
