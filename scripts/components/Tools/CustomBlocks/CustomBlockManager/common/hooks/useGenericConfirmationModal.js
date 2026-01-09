import { Button, FlexBox, ModalContext } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  deleteDisplayConditionModalContainer: {
    width: 600,
  },
});

const useGenericConfirmationModal = (modalId = "confirmationModal") => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const classes = useStyles();

  const closeModal = () => {
    modalActions.removeById(modalId);
  };
  const openModal = (title, text, handleConfirm, handleCancel) => {
    modalActions.add({
      id: modalId,
      customClassNames: {
        container: classes.deleteDisplayConditionModalContainer,
      },
      title: iln.gettext(title),
      component: (
        <div>
          <p>{iln.gettext(text)}</p>
          <FlexBox hAlign={"space-between"}>
            <Button
              onClick={() => {
                handleCancel && handleCancel();
                modalActions.removeById(modalId);
              }}
            >
              {iln.gettext("Cancel")}
            </Button>
            <Button
              onClick={() => {
                handleConfirm();
                modalActions.removeById(modalId);
              }}
            >
              {iln.gettext("Confirm")}
            </Button>
          </FlexBox>
        </div>
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
    });
  };

  return {
    openModal,
    closeModal,
  };
};

export default useGenericConfirmationModal;
