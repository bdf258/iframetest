import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import parentFieldOptions from "../../DisplayConditionList/util/parentFieldOptions";
import propTypes from "./Parent.propTypes";
import { useStyles } from "./ParentField.styles";

const ParentField = ({
  parent_object,
  handleParentObjectSelected,
  selectedParentField,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const parentObjectForDisplay =
    parent_object === "cases" ? "Cases" : "Constituent";

  return (
    <FormSelect
      customClassNames={{
        label: classes.label,
        container: classes.inputContainer,
        select: classes.caseFieldInput,
      }}
      value={selectedParentField}
      name={"caseField"}
      label={iln.gettext(`${parentObjectForDisplay} field`)}
      keepErrorSpacing={false}
      onChange={(e) => handleParentObjectSelected(e)}
    >
      {Object.keys(parentFieldOptions[parent_object]).map((caseFieldOption) => (
        <option
          value={parentFieldOptions[parent_object][caseFieldOption].value}
          key={parentFieldOptions[parent_object][caseFieldOption].value}
        >
          {parentFieldOptions[parent_object][caseFieldOption].text}
        </option>
      ))}
    </FormSelect>
  );
};

ParentField.propTypes = propTypes;

export default ParentField;
