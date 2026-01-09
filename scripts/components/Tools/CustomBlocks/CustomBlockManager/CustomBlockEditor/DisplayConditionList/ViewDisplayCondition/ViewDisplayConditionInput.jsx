import {
  Button,
  Card,
  FlexBox,
  ModalContext,
} from "@electedtech/electedtech-ui";
import React, { useContext, useState } from "react";

import ConditionHeader from "./ConditionHeader/ConditionHeader.jsx";
import EditConditionalBlock from "../../EditConditionalBlock/EditConditionalBlock.jsx";
import { TranslationContext } from "context/translate";
import ViewParentFieldOptions from "./ViewParentFieldOptions/ViewParentFieldOptions.jsx";
import ViewParentObjectField from "./ViewParentObjectField/ViewParentObjectField.jsx";
import classnames from "classnames";
import propTypes from "./ViewDisplayConditionInput.propTypes";
import { useStyles } from "./ViewDisplayConditonalInput.styles";

const ViewDisplayConditionInput = ({
  parent_object,
  displayCondition,
  handleRemoveConditionalBlock,
  handleSaveConditionalBlock,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();
  const { modalActions } = useContext(ModalContext);

  const [collapsed, setCollapsed] = useState(true);

  const { parentObjectField, parentObjectFieldOptions } = displayCondition;

  const editConditionsModalId = "displayConditionsModal";

  return (
    <Card
      className={classnames(
        classes.displayConditionCard,
        collapsed ? classes.collapseCard : null
      )}
    >
      <ConditionHeader
        parent_object={parent_object}
        parentObjectFieldOptions={parentObjectFieldOptions}
        handleCollapse={() => setCollapsed((collapsed) => !collapsed)}
        parentObjectField={parentObjectField}
        collapsed={collapsed}
        handleRemoveConditionalBlock={() =>
          handleRemoveConditionalBlock(parentObjectField)
        }
      />
      <ViewParentObjectField
        parentObjectField={parentObjectField}
        parent_object={parent_object}
      />
      <ViewParentFieldOptions
        parent_object={parent_object}
        parentObjectField={parentObjectField}
        parentObjectFieldOptions={parentObjectFieldOptions}
      />
      <FlexBox
        className={classes.editConditionalBlockButtonContainer}
        hAlign={"end"}
      >
        <Button
          onClick={() =>
            modalActions.add({
              id: editConditionsModalId,
              customClassNames: {
                container: classes.editConditionModalContainer,
              },
              title: iln.gettext("Edit Display Condition"),
              component: (
                <EditConditionalBlock
                  existingConditionalBlock
                  modalId={editConditionsModalId}
                  parent_object={parent_object}
                  displayCondition={displayCondition}
                  handleSaveConditionalBlock={handleSaveConditionalBlock}
                />
              ),
              blurBackground: true,
              lockWindow: true,
              allowClose: true,
            })
          }
        >
          {iln.gettext("Edit")}
        </Button>
      </FlexBox>
    </Card>
  );
};

ViewDisplayConditionInput.propTypes = propTypes;

export default ViewDisplayConditionInput;
