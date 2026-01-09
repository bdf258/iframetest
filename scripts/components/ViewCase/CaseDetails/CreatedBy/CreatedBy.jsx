import React, { useContext } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { useReduxSlice } from "./CreatedBy.redux.js";

const caseworkerNameById = (caseworkers, id, iln) => {
  const caseworker = caseworkers.find((cw) => cw.id == id);
  if (caseworker && caseworker.name) {
    return caseworker.name;
  } else {
    return iln.gettext("Unknown");
  }
};

const AssignedTo = ({ ...props }) => {
  const iln = useContext(TranslationContext);

  const { caseworkers, caseDetails } = useReduxSlice();

  return (
    <FormTextInput
      {...props}
      value={caseworkerNameById(caseworkers, caseDetails.createdbyID, iln)}
    />
  );
};

export default AssignedTo;
