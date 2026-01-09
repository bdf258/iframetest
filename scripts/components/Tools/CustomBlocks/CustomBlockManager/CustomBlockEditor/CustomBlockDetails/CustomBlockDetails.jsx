import { FormSelect, FormTextInput } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import CustomBlockNameInput from "./CustomBlockNameInput/CustomBlockNameInput.jsx";
import { TranslationContext } from "context/translate";
import propTypes from "./CustomBlockDetails.propTypes";
import { useStyles } from "./CustomBlockDetails.styles";

const CustomBlockDetails = ({
  name,
  parent_object,
  handleCustomFieldNameChange,
  handleCustomFieldParentObjectChange,
  editingExistingCustomBlock,
  onUniqueName,
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const parentObjectOptions = [
    { value: "cases", text: "Cases" },
    // { value: "constituents", text: "Constituents" },
  ];

  return (
    <React.Fragment>
      <CustomBlockNameInput
        customClassNames={{
          label: classes.label,
          container: classes.inputContainer,
          input: classes.inputDisabled,
        }}
        value={name || ""}
        onChange={(e) => handleCustomFieldNameChange(e.target.value)}
        onUniqueName={onUniqueName}
      />
      {editingExistingCustomBlock && (
        <FormTextInput
          name={"parentObject"}
          value={parentObjectOptions.reduce(
            (acc, parentObjectOption) =>
              parentObjectOption.value === parent_object
                ? parentObjectOption.text
                : acc,
            ""
          )}
          customClassNames={{
            label: classes.label,
            container: classes.inputContainer,
            input: classes.inputDisabled,
          }}
          disabled={editingExistingCustomBlock}
          readOnly
          label={iln.gettext("Parent Object")}
          keepErrorSpacing={false}
        />
      )}
      {!editingExistingCustomBlock && (
        <FormSelect
          customClassNames={{
            label: classes.label,
            container: classes.inputContainer,
          }}
          value={parent_object || ""}
          name={"parentObject"}
          label={iln.gettext("Parent Object")}
          onChange={(e) => handleCustomFieldParentObjectChange(e.target.value)}
          keepErrorSpacing={false}
        >
          {parentObjectOptions.map(({ text, value }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </FormSelect>
      )}
      <FormTextInput
        customClassNames={{
          label: classes.label,
          container: classes.inputContainer,
          input: classes.inputDisabled,
        }}
        disabled={editingExistingCustomBlock}
        readOnly
        value={iln.gettext("Custom")}
        name={"type"}
        label={iln.gettext("Type")}
        keepErrorSpacing={false}
      />
    </React.Fragment>
  );
};

CustomBlockDetails.propTypes = propTypes;

export default CustomBlockDetails;
