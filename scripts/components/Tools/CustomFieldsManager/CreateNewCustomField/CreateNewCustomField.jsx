import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./CreateNewCustomField.propTypes";

const CreateNewCustomField = ({ handleCreateNewCustomField }) => {
  const iln = useContext(TranslationContext);
  return (
    <FlexBox hAlign={"right"}>
      <Button onClick={() => handleCreateNewCustomField()}>
        {iln.gettext("Create New Field")}
      </Button>
    </FlexBox>
  );
};

CreateNewCustomField.propTypes = propTypes;
export default CreateNewCustomField;
