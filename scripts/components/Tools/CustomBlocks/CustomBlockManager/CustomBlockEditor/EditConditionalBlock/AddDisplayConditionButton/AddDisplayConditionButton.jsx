import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./AddDisplayConditionButton.propTypes";
import { useStyles } from "./AddDisplayConditionButton.styles";

const AddDisplayConditionButton = ({ handleAddOption, disable }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <FlexBox hAlign={"center"}>
        <Button
          size={"small"}
          onClick={() => handleAddOption()}
          isDisabled={disable}
        >
          {iln.gettext("Add Display Condition")}
        </Button>
      </FlexBox>
    </div>
  );
};

AddDisplayConditionButton.propTypes = propTypes;
export default AddDisplayConditionButton;
