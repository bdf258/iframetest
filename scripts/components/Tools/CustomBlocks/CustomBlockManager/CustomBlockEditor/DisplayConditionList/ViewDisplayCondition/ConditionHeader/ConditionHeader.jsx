import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import IconButton from "../../../../../../../common/IconButton/IconButton.jsx";
import { TranslationContext } from "context/translate";
import parentFieldOptions from "../../util/parentFieldOptions";
import propTypes from "./ConditionHeader.propTypes";
import useGenericConfirmationModal from "../../../../common/hooks/useGenericConfirmationModal";
import { useStyles } from "./ConditionHeader.styles";

const ConditionHeader = ({
  parent_object,
  parentObjectField,
  parentObjectFieldOptions,
  handleRemoveConditionalBlock,
  collapsed,
  handleCollapse,
}) => {
  const iln = useContext(TranslationContext);

  const classes = useStyles();
  const { openModal } = useGenericConfirmationModal();

  const displayConditionHeader = () => {
    const caseFieldOptionText =
      parentFieldOptions[parent_object][parentObjectField].text;
    const conditions = parentObjectFieldOptions.reduce(
      (acc, condition, index) => {
        const conditionText = parentFieldOptions[parent_object][
          parentObjectField
        ].options.find(({ id }) => id === condition)[
          parentFieldOptions[parent_object][parentObjectField].localStorage
            .displayText
        ];
        return `${acc} ${conditionText}${
          index === parentObjectFieldOptions.length - 1 ? "" : ","
        }`;
      },
      ""
    );

    return `${caseFieldOptionText}: (${conditions} ) `;
  };

  return (
    <div className={classes.displayConditionHeaderContainer}>
      <FlexBox hAlign={"space-between"}>
        <h4 className={classes.displayConditionHeader}>
          {displayConditionHeader()}
        </h4>
        <div>
          <FlexBox>
            <Button
              size={"small"}
              onClick={() =>
                openModal(
                  "Delete Display Condition Block",
                  "Are you sure you want to delete the conditional block?",
                  handleRemoveConditionalBlock
                )
              }
            >
              {iln.gettext("Remove Condition")}
            </Button>
            <div className={classes.iconButtonContainer}>
              <IconButton
                onClick={() => handleCollapse()}
                icon={collapsed ? "downArrow" : "upArrow"}
                width={25}
                height={25}
              />
            </div>
          </FlexBox>
        </div>
      </FlexBox>
    </div>
  );
};

ConditionHeader.propTypes = propTypes;
export default ConditionHeader;
