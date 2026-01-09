import { ModalContext, SliderContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import ContactSelectPlaceHolder from "../../../../ContactSelect/ContactSelectPlaceHolder.jsx";
import LetterEditor from "../../../../../common/LetterEditor/LetterEditor.jsx";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import { formatDateTimeBE } from "../../../../../../helpers/timezoneHelpers";
import { selectConstituent } from "../../../../slice/viewCaseSlice";
import useGetCustomFieldMergeCodeList from "../../../../../../hooks/useGetCustomFieldMergeCodeList.js";
import { useReduxSlice } from "../Letter.redux";
import { useSendViaEmail } from "./useSendViaEmail";

export const useEditLetter = (casenote, index) => {
  const { modalActions } = useContext(ModalContext);
  const { sliderActions } = useContext(SliderContext);
  const iln = useContext(TranslationContext);

  const { updateCasenote, setSelectedNote, removeSelectedNote } =
    useReduxSlice();

  const {
    constituent,
    caseId,
    caseDetails: { status, category },
    customFieldValues,
  } = useReduxSlice(selectConstituent);

  const [handleSendViaEmail] = useSendViaEmail(casenote);
  const [customFieldsAsMergeCodes] = useGetCustomFieldMergeCodeList({
    customFieldValues,
    caseCategory: status,
    caseStatus: category,
  });

  const openSliderWithLoadingIndicator = () => {
    sliderActions.open({
      title: iln.gettext("Write a Letter"),
      component: <ContactSelectPlaceHolder communicationType={"email"} />,
    });
  };

  const openModalWithLetterEditor = ({
    letterheadId,
    reference,
    text,
    footer,
    id,
  }) => {
    sliderActions.open({
      title: iln.gettext("Write a Letter"),
      component: (
        <LetterEditor
          additionalMergeCodes={customFieldsAsMergeCodes}
          caseId={caseId}
          letterId={id}
          letterSaved={(savedLetter) =>
            updateCasenote(
              index,
              {
                ...casenote,
                openUpdateStatusModal: savedLetter?.openUpdateStatusModal,
                details: {
                  ...savedLetter,
                },
                timestamp: formatDateTimeBE(new Date()),
              },
              false,
              savedLetter.scrollToNote
            )
          }
          letterheadId={letterheadId}
          constituent={constituent}
          letterRef={reference}
          recipient={null}
          letterBody={text}
          letterFooter={footer}
          sendViaEmail={(letter) => handleSendViaEmail(letter.id)}
        />
      ),
      onClose: () => removeSelectedNote(),
    });
  };

  const handleEditLetter = async (letterId) => {
    openSliderWithLoadingIndicator();
    try {
      const letter = await api.getLetter(letterId, modalActions, iln);
      setSelectedNote(letter.noteID);
      openModalWithLetterEditor(letter);
    } catch (e) {
      sliderActions.close();
    }
  };
  return [handleEditLetter];
};
