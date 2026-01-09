import {
  FormSelectAutoComplete,
  NotificationBox,
  Placeholder,
} from "@electedtech/electedtech-ui";
import React, { useContext, useEffect } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./propTypes";
import { useStyles } from "../styles";

const SelectLetterHead = ({
  onChange,
  letterheadTemplates,
  selectedTemplate,
  customClassNames = {},
}) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  useEffect(() => {
    if (letterheadTemplates.length >= 1) {
      onChange(letterheadTemplates[0].id);
    }
  }, [letterheadTemplates]);

  if (!letterheadTemplates) return <Placeholder width="100%" height="32px" />;

  if (letterheadTemplates && letterheadTemplates.length === 0) {
    return (
      <NotificationBox
        type={"warn"}
        alertMessage={iln.gettext(
          "There are no letterheads available please contact support."
        )}
      />
    );
  }

  if (letterheadTemplates.length === 1) {
    return null;
  }

  return (
    <React.Fragment>
      <FormSelectAutoComplete
        customClassNames={{
          container: classes.inputContainer,
          label: classes.label,
          ...customClassNames,
        }}
        keepErrorSpacing={false}
        label={iln.gettext("Letterhead to use")}
        value={selectedTemplate ? selectedTemplate : letterheadTemplates[0].id}
        onChange={(e) => onChange(e.target.value)}
        name={"letterHead"}
      >
        {letterheadTemplates.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </FormSelectAutoComplete>
    </React.Fragment>
  );
};

SelectLetterHead.propTypes = propTypes;

export default SelectLetterHead;
