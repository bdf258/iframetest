import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../context/translation/TranslationContext.js";
import propTypes from "./CreateNewContactOption.propTypes.js";

const CreateNewContactOption = ({
  contactDetails,
  setContactDetails,
  contactDetailName,
  newContact,
}) => {
  const iln = useContext(TranslationContext);

  return (
    <Button
      isDisabled={contactDetails.some(({ id }) => !id)}
      onClick={() => setContactDetails([...contactDetails, newContact])}
      size="small"
    >
      {iln.gettext("Add new %1", contactDetailName?.toLowerCase())}
    </Button>
  );
};

CreateNewContactOption.propTypes = propTypes;

export default CreateNewContactOption;
