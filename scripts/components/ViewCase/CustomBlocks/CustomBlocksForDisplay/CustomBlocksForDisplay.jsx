import { Card, FlexBox } from "@electedtech/electedtech-ui";
import CustomFieldsAsInputs from "../../../common/CustomFields/CustomFieldsAsInputs/CustomFieldsAsInputs.jsx";
import React from "react";
import propTypes from "./CustomBlocksForDisplay.propTypes";
import { useStyles } from "./CustomBlocksForDisplay.styles";
import { useTheme } from "react-jss";

const CustomBlocksForDisplay = ({
  customBlocksAsInputs,
  onChange,
  customClassNames,
}) => {
  const theme = useTheme();

  const classes = useStyles({ theme });

  if (!customBlocksAsInputs || customBlocksAsInputs.length <= 0) {
    return null;
  }

  return (
    <FlexBox className={classes.customBlocksWrapper}>
      {customBlocksAsInputs.map((customBlock) => {
        const { id, name, inputs } = customBlock;
        return (
          <Card key={id} className={classes.customBlockCard}>
            <div className={classes.cardHeaderCustomBlocks}>
              <div className={classes.cardHeader}>{name}</div>
            </div>
            <CustomFieldsAsInputs
              textAreaHeight={60}
              onChange={(customBlocks) => onChange(customBlocks)}
              customFieldsAsInputs={inputs}
              customClassNames={{
                container: classes.noMargin,
                label: classes.inputLabel,
                inputWrapper: classes.inputWrapper,
                ...customClassNames,
              }}
            />
          </Card>
        );
      })}
    </FlexBox>
  );
};

CustomBlocksForDisplay.propTypes = propTypes;

export default CustomBlocksForDisplay;
