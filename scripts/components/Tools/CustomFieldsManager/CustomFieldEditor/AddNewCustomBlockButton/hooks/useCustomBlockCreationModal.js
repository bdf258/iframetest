import React, { useContext } from "react";

import CustomBlockEditor from "../../../../CustomBlocks/CustomBlockManager/CustomBlockEditor/CustomBlockEditor.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { createUseStyles } from "react-jss";
import localStorageHelper from "../../../../../../helpers/localStorageHelper";
import modalStyles from "../../../../../common/Modal/styles";
import theme from "../../../../../../../theme";
import useCustomBlocks from "./useCustomBlocks";
import { useTheme } from "theming";

const useStyles = createUseStyles({
  modalContainer: {
    width: theme.modal.width.medium,
    ...modalStyles.positionBelowMainNav,
  },
});

const useCustomBlockCreationModal = (handleSaveNewCustomBlock) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const modalId = "createCustomBlock";
  const [modalLoading, customBlocks] = useCustomBlocks();
  const theme = useTheme();
  const classes = useStyles(theme);

  const closeModal = () => {
    modalActions.removeById(modalId);
  };
  const openModal = () => {
    modalActions.add({
      component: (
        <CustomBlockEditor
          cancelEditCustomBlock={() => modalActions.removeById(modalId)}
          saveExistingCustomBlock={() => {}}
          saveNewCustomBlock={(customBlock) => {
            localStorageHelper.setItem("customField_blocks", [
              customBlock,
              ...customBlocks,
            ]);
            handleSaveNewCustomBlock(customBlock);
          }}
          customBlocks={customBlocks}
          selectedCustomBlock={undefined}
        />
      ),
      title: iln.gettext("Create Custom Block"),
      id: modalId,
      blurBackground: true,
      lockWindow: true,
      allowClose: true,
      customClassNames: {
        card: classes.modalContainer,
      },
    });
  };

  return [modalLoading, openModal, closeModal];
};

export default useCustomBlockCreationModal;
