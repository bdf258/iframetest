import LetterPreview from "../../../../common/LetterPreview/LetterPreview.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import { useContext } from "react";
import { useStyles } from "../../styles";

export const useGenerateHeadedLetter = (modalTitle, letterId) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);

  const generateHeadedLetter = () => {
    modalActions.add({
      id: "view_letter_pdf_modal",
      title: modalTitle,
      blurBackground: true,
      component: (
        <LetterPreview letterID={letterId} title={modalTitle} showSave signed />
      ),
      customClassNames: {
        card: classes.modalCard,
      },
    });
  };

  return [generateHeadedLetter];
};
