import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./AddParentObjectFieldType.propTypes";
import { useStyles } from "./AddParentObjectFieldType.styles";

const AddParentObjectFieldType = ({
  handleAddParentObjectFieldType,
  selectedParentFieldName,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.buttonContainer}>
      <FlexBox hAlign={"center"}>
        <Button
          customClassNames={classes.button}
          size={"small"}
          onClick={() => handleAddParentObjectFieldType()}
        >
          {iln.gettext(`Add ${selectedParentFieldName} option`)}
        </Button>
      </FlexBox>
    </div>
  );
};

AddParentObjectFieldType.propTypes = propTypes;

export default AddParentObjectFieldType;
