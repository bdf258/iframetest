import {
  Button,
  Card,
  FlexBox,
  ModalContext,
  NotificationBox,
  Spinner,
} from "@electedtech/electedtech-ui";
import React, { useContext, useRef, useState } from "react";

import CustomBlockDetails from "./CustomBlockDetails/CustomBlockDetails.jsx";
import { TranslationContext } from "context/translate";
import ViewConditionList from "./DisplayConditionList/ViewConditionList.jsx";
import customBlocksApi from "../../../../../api/src/customBlocks";
import propTypes from "./CustomBlockEditor.propTypes";
import useCustomBlock from "./hooks/useCustomBlock";
import useCustomBlockValidation from "./hooks/useCutsomBlockValidation";
import useGenericConfirmationModal from "../common/hooks/useGenericConfirmationModal";
import { useStyles } from "./CustomBlockEditor.styles";

const CustomBlockEditor = ({
  customBlocks,
  selectedCustomBlock,
  saveExistingCustomBlock,
  saveNewCustomBlock,
  cancelEditCustomBlock,
}) => {
  const iln = useContext(TranslationContext);
  const { modalActions } = useContext(ModalContext);
  const classes = useStyles();

  const editingExistingCustomBlock = useRef(!!selectedCustomBlock);
  const confirmationModalId = "confirmationModal";
  const { openModal } = useGenericConfirmationModal(confirmationModalId);
  const [customBlock, dispatch] = useCustomBlock(selectedCustomBlock);
  const [savingOverlay, setSavingOverlay] = useState(false);
  const [nameUnique, setNameUnique] = useState(true);

  const { invalidCustomBlock } = useCustomBlockValidation(
    customBlocks,
    customBlock,
    editingExistingCustomBlock.current,
    nameUnique
  );
  const { name, parent_object, display_conditions } = customBlock;

  const handleSaveCustomBlock = () => {
    setSavingOverlay(true);
    if (editingExistingCustomBlock.current) {
      customBlocksApi
        .updateCustomBlock(customBlock, modalActions)
        .then((res) => {
          saveExistingCustomBlock(res.data);
          modalActions.removeById(confirmationModalId);
          setSavingOverlay(false);
        })
        .catch(() => {
          modalActions.removeById(confirmationModalId);
          setSavingOverlay(false);
        });
    } else {
      customBlocksApi
        .createCustomBlock(customBlock, modalActions)
        .then((res) => {
          saveNewCustomBlock(res.data);
          modalActions.removeById(confirmationModalId);
          setSavingOverlay(false);
        })
        .catch(() => {
          modalActions.removeById(confirmationModalId);
          setSavingOverlay(false);
        });
    }
  };

  const handleCustomFieldParentObjectChange = (customBlockParent) => {
    if (display_conditions && Object.keys(display_conditions).length > 0) {
      openModal(
        iln.gettext("Confirm Parent Object Change"),
        iln.gettext(
          "Are you sure you want to change the parent object? This action will remove all of the conditional display blocks."
        ),
        () => {
          modalActions.removeById(confirmationModalId);
          dispatch({
            type: "SET_PARENT_OBJECT",
            payload: customBlockParent,
          });
          dispatch({
            type: "REMOVE_ALL_DISPLAY_CONDITIONS",
          });
        },
        () => {
          dispatch({
            type: "SET_PARENT_OBJECT",
            payload: parent_object,
          });
        }
      );
    }
    dispatch({
      type: "SET_PARENT_OBJECT",
      payload: customBlockParent,
    });
  };

  return (
    <React.Fragment>
      {savingOverlay && (
        <div className={classes.savingOverlayContainer}>
          <div className={classes.savingOverlayContentContainer}>
            <div className={classes.overlayTitleContainer}>
              <h2>{iln.gettext("Saving custom block")}</h2>
            </div>
            <div className={classes.overlaySpinnerContainer}>
              <Spinner scale={1} />
            </div>
          </div>
        </div>
      )}
      <Card className={classes.customBlockDetailsCard}>
        <CustomBlockDetails
          onUniqueName={(name) => setNameUnique(name)}
          editingExistingCustomBlock={editingExistingCustomBlock.current}
          name={name}
          parent_object={parent_object}
          handleCustomFieldNameChange={(customBlockName) =>
            dispatch({
              type: "SET_NAME",
              payload: customBlockName,
            })
          }
          handleCustomFieldParentObjectChange={
            handleCustomFieldParentObjectChange
          }
        />
      </Card>
      <h3>{iln.gettext("Display block when")}</h3>
      <ViewConditionList
        parent_object={parent_object}
        display_conditions={display_conditions}
        handleSaveConditionalBlock={(conditional_block) => {
          dispatch({
            type: "EDIT_DISPLAY_CONDITION",
            payload: { conditional_block },
          });
        }}
        onSaveNewConditionalBlock={(conditional_block) => {
          dispatch({
            type: "ADD_NEW_DISPLAY_CONDITION",
            payload: conditional_block,
          });
        }}
        handleRemoveConditionalBlock={(parentObjectField) => {
          dispatch({
            type: "REMOVE_DISPLAY_CONDITION",
            payload: {
              parentObjectField,
              parent_object,
            },
          });
        }}
      />

      {invalidCustomBlock(
        customBlocks,
        customBlock,
        editingExistingCustomBlock
      ) && (
        <NotificationBox
          type={"info"}
          alertMessage={invalidCustomBlock(
            customBlocks,
            customBlock,
            editingExistingCustomBlock
          )}
        />
      )}

      <FlexBox hAlign={"space-between"}>
        <Button onClick={() => cancelEditCustomBlock()}>
          {iln.gettext("Cancel")}
        </Button>
        <Button
          isDisabled={
            !!invalidCustomBlock(
              customBlocks,
              customBlock,
              editingExistingCustomBlock
            )
          }
          onClick={() => handleSaveCustomBlock()}
        >
          {iln.gettext("Save")}
        </Button>
      </FlexBox>
    </React.Fragment>
  );
};

CustomBlockEditor.propTypes = propTypes;

export default CustomBlockEditor;
