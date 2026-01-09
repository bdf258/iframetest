import React, { useContext } from "react";

import AddDisplayConditionButton from "../EditConditionalBlock/AddDisplayConditionButton/AddDisplayConditionButton.jsx";
import EditConditionalBlock from "../EditConditionalBlock/EditConditionalBlock.jsx";
import { ModalContext } from "@electedtech/electedtech-ui";
import { ParentObjectDisplayBlockConditionsForDisplay } from "./util/parentObjectDisplayBlockConditionsForDisplay";
import { TranslationContext } from "context/translate";
import ViewDisplayConditionInput from "./ViewDisplayCondition/ViewDisplayConditionInput.jsx";
import { conditionalBlockToSave } from "./util/ConditionalBlockToSave";
import propTypes from "./ViewConditionsList.propTypes";
import { useStyles } from "./ViewConditionList.styles";

const ViewConditionList = ({
  parent_object,
  display_conditions,
  handleSaveConditionalBlock,
  onSaveNewConditionalBlock,
  handleRemoveConditionalBlock,
}) => {
  const { modalActions } = useContext(ModalContext);
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  const editConditionsModalId = "displayConditionsModal";

  const blankConditionalBlock = {
    parentObjectField: "",
    parentObjectFieldOptions: [],
  };

  return (
    <React.Fragment>
      {display_conditions &&
        Object.keys(display_conditions).length > 0 &&
        ParentObjectDisplayBlockConditionsForDisplay(
          display_conditions,
          parent_object
        ).map((displayCondition, index) => (
          <ViewDisplayConditionInput
            key={index}
            parent_object={parent_object}
            displayCondition={displayCondition[0]}
            handleSaveConditionalBlock={(display_condition) => {
              handleSaveConditionalBlock(
                conditionalBlockToSave(display_condition, parent_object)
              );
            }}
            handleRemoveConditionalBlock={(parentObjectField) =>
              handleRemoveConditionalBlock(parentObjectField)
            }
            handleAddCondition={() => {}}
          />
        ))}
      <AddDisplayConditionButton
        disable={!parent_object}
        handleAddOption={() =>
          modalActions.add({
            id: editConditionsModalId,
            customClassNames: {
              container: classes.editConditionModalContainer,
            },
            title: iln.gettext("Create new display condition"),
            component: (
              <EditConditionalBlock
                modalId={editConditionsModalId}
                parent_object={parent_object}
                displayCondition={blankConditionalBlock}
                handleSaveConditionalBlock={(display_condition) => {
                  onSaveNewConditionalBlock(
                    conditionalBlockToSave(display_condition, parent_object)
                  );
                }}
              />
            ),
            blurBackground: true,
            lockWindow: true,
            allowClose: true,
          })
        }
      />
    </React.Fragment>
  );
};

ViewConditionList.propTypes = propTypes;

export default ViewConditionList;
