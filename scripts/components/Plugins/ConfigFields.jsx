import { FormCheckbox, FormHandler } from "@electedtech/electedtech-ui";

import PropTypes from "prop-types";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  label: {
    marginLeft: "46px",
    width: "157px",
  },
  input: {
    width: "400px",
  },
  inputLabels: {
    width: "125px",
  },
  container: {
    marginLeft: "47px",
  },
});

function ConfigFields({ formFields, updateValues, formState }) {
  const classes = useStyle();
  return (
    //Renders form fields passed in props
    <div>
      <FormHandler state={formState} onSubmit={() => {}}>
        {formFields.map((field) => (
          <field.comp
            key={field.name + field.label}
            name={field.name}
            label={field.label}
            onChange={(e) => updateValues(e)}
            customClassNames={
              field.comp === FormCheckbox
                ? {
                    label: classes.label,
                    container: classes.container,
                  }
                : {
                    input: classes.input,
                    label: classes.inputLabels,
                  }
            }
          />
        ))}
      </FormHandler>
    </div>
  );
}

ConfigFields.propTypes = {
  formFields: PropTypes.array,
  formState: PropTypes.object,
  updateValues: PropTypes.func,
};

export default ConfigFields;
