import { Button, FlexBox } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./RemoveOptionConfirmationModal.propTypes";

const RemoveOptionConfirmationModal = ({
  handleCancel,
  handleRemoveOption,
}) => {
  const iln = useContext(TranslationContext);
  return (
    <div>
      <p>{iln.gettext("Are you sure you want to delete this option?")}</p>
      <FlexBox hAlign={"space-between"}>
        <Button onClick={handleCancel}>{iln.gettext("Cancel")}</Button>
        <Button onClick={handleRemoveOption}>{iln.gettext("Remove")}</Button>
      </FlexBox>
    </div>
  );
};

RemoveOptionConfirmationModal.propTypes = propTypes;

export default RemoveOptionConfirmationModal;
