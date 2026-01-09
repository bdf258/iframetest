import React, { useContext } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import parentFieldOptions from "../../util/parentFieldOptions";
import propTypes from "./ViewParentObjectField.propTypes";
import { useStyles } from "./ViewParentObjectField.styles";

const ViewParentObjectField = ({ parent_object, parentObjectField }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const parentObjectForDisplay =
    parent_object === "cases" ? "Cases" : "Constituent";

  return (
    <FormTextInput
      readOnly
      customClassNames={{
        label: classes.label,
        container: classes.inputContainer,
        select: classes.caseFieldInput,
      }}
      value={parentFieldOptions[parent_object][parentObjectField].text}
      name={"caseField"}
      label={iln.gettext(`${parentObjectForDisplay} field`)}
      keepErrorSpacing={false}
    />
  );
};

ViewParentObjectField.propTypes = propTypes;
export default ViewParentObjectField;
