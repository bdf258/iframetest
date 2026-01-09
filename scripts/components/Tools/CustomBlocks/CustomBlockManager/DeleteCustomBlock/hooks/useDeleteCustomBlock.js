import DeleteCustomBlock from "../DeleteCustomBlock.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import React from "react";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import { useContext } from "react";

const useStyles = createUseStyles({
  deleteDisplayConditionModalContainer: {
    width: 600,
  },
});
const useDeleteCustomBlock = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);

  const modalId = "deleteCustomBlockModal";
  const openDeleteCustomBlockModal = (
    customBlockId,
    customBlockName,
    parent_object,
    handleConfirmDeleteCustomBlock
  ) => {
    modalActions.add({
      id: modalId,
      customClassNames: {
        container: classes.deleteDisplayConditionModalContainer,
      },
      title: iln.gettext("Delete Custom Block"),
      component: (
        <DeleteCustomBlock
          handleConfirmDeleteCustomBlock={(cbi) => {
            handleConfirmDeleteCustomBlock(cbi);
          }}
          customBlockId={customBlockId}
          customBlockName={customBlockName}
          parent_object={parent_object}
          onCancel={() => modalActions.removeById(modalId)}
          onDone={() => modalActions.removeById(modalId)}
        />
      ),
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
    });
  };

  return {
    openDeleteCustomBlockModal,
  };
};

export default useDeleteCustomBlock;
