import { ModalContext, SliderContext } from "@electedtech/electedtech-ui";
import React, { useRef } from "react";

import BlankEmail from "../../../../../common/ComposeEmail/consts/BlankEmail";
import ContactSelectPlaceHolder from "../../../../ContactSelect/ContactSelectPlaceHolder.jsx";
import { TranslationContext } from "context/translate";
import WriteEmail from "../../../../../common/CreateCommunication/WriteEmail";
import api from "@electedtech/api";
import { formatDateTimeBE } from "../../../../../../helpers/timezoneHelpers";
import { getUserIdentity } from "../../../../../../helpers/localStorageHelper.js";
import { useContext } from "react";
import { useReduxSlice } from "../Letter.redux";

const { id: caseworkerID } = getUserIdentity() || {};

export const useSendViaEmail = (casenote) => {
  casenote = { ...casenote, caseworkerID }; // Assign current user ID

  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);
  const temporaryEmailSaved = useRef(false);

  const {
    setSelectedNote,
    removeSelectedNote,
    addTemporaryNote,
    removeTemporaryNote,
    updateCasenoteByNoteId,
    addCasenote,
    contactTypes,
    caseId,
    constituent,
  } = useReduxSlice();

  const createEmailToAttachLetter = async () =>
    await api.saveDraftEmail(
      { ...BlankEmail, caseID: casenote.caseID },
      modalActions
    );

  const attachLetterToEmail = async (letterId, emailId) =>
    await api.attachedSignedLetterToEmail(letterId, emailId, modalActions, iln);

  const attachFileToEmail = async (attachment, emailId) => {
    return await api.attachExistingFileToEmail(
      casenote.type,
      attachment.detail.id,
      emailId,
      modalActions,
      iln
    );
  };

  const openSliderWithLoadingIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Write an Email"),
      component: <ContactSelectPlaceHolder communicationType={"email"} />,
    });
  };

  const deleteTemporaryEmailNote = (id) => {
    api.deleteEmail(id, modalActions, iln);
  };

  const communicationEdited = (communication, emailToEdit) => {
    removeTemporaryNote(emailToEdit.noteID);
    temporaryEmailSaved.current = true;
    addCasenote({
      ...casenote,
      id: emailToEdit.noteID,
      detail: communication,
      type: "email",
      timestamp: formatDateTimeBE(new Date()),
    });
    updateCasenoteByNoteId(emailToEdit.noteID, {
      ...casenote,
      id: emailToEdit.noteID,
      detail: communication,
      type: "email",
      timestamp: formatDateTimeBE(new Date()),
    });
  };

  const openModalWithEmailEditor = (emailToEdit, attachment) => {
    setSelectedNote(emailToEdit.noteID);
    addTemporaryNote(emailToEdit.noteID);

    sliderActions.open({
      title: iln.gettext("Write an Email"),
      component: (
        <WriteEmail
          caseId={caseId}
          contactTypes={contactTypes}
          constituent={constituent}
          emailSaved={(savedEmail) =>
            communicationEdited(savedEmail, emailToEdit)
          }
          emailSent={(sentEmail) => {
            communicationEdited(sentEmail, emailToEdit);
            sliderActions.close();
          }}
          existingEmail={{
            ...emailToEdit,
            from: {},
            attachments: [attachment],
          }}
        />
      ),
      onClose: () => {
        removeSelectedNote();
        removeTemporaryNote(emailToEdit.noteID);
        !temporaryEmailSaved.current &&
          deleteTemporaryEmailNote(emailToEdit.id);
      },
    });
  };

  const handleSendViaEmail = async (letterId) => {
    openSliderWithLoadingIndicator();
    try {
      const emailToEdit = await createEmailToAttachLetter();
      const attachment =
        casenote.type === "letter"
          ? await attachLetterToEmail(letterId, emailToEdit.id)
          : await attachFileToEmail(letterId, emailToEdit.id);

      await openModalWithEmailEditor(emailToEdit, attachment);
    } catch (e) {
      sliderActions.close();
    }
  };

  return [handleSendViaEmail];
};
