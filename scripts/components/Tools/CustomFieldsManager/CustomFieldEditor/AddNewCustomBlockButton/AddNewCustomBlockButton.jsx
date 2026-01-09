import { Button, Spinner } from "@electedtech/electedtech-ui";
import React from "react";
import propTypes from "./AddNewCustomBlockButton.propTypes";
import useCustomBlockCreationModal from "./hooks/useCustomBlockCreationModal";
import { useStyles } from "./AddNewCustomBlockButton.styles";
import { useTheme } from "theming";

const AddNewCustomBlockButton = ({ handleSaveNewCustomBlock }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [modalLoading, openModal, closeModal] = useCustomBlockCreationModal(
    (customBlock) => {
      closeModal();
      handleSaveNewCustomBlock(customBlock);
    }
  );

  return (
    <Button
      isDisabled={modalLoading}
      customClassNames={classes.createCustomBlockButtonContainer}
      onClick={() => openModal()}
    >
      {modalLoading ? <Spinner scale={0.5} /> : "Create Custom Block"}
    </Button>
  );
};

AddNewCustomBlockButton.propTypes = propTypes;

export default AddNewCustomBlockButton;
