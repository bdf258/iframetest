import React, { useContext } from "react";

import LetterPreview from "../../../../common/LetterPreview/LetterPreview.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { useReduxSlice } from "../Letter.redux";
import { useStyles } from "../../styles";

export const usePrintLetter = (modalTitle, letterId) => {
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);

  const { setShowCaseStatusModal } = useReduxSlice();

  const handlePrintLetter = () =>
    modalActions.add({
      id: "view_letter_pdf_modal",
      title: modalTitle,
      blurBackground: true,
      component: (
        <LetterPreview
          letterID={letterId}
          title={modalTitle}
          handleLetterPrinted={() => setShowCaseStatusModal(true)}
          showPrint
          showSave
        />
      ),
      customClassNames: {
        card: classes.modalCard,
      },
    });
  return [handlePrintLetter];
};
