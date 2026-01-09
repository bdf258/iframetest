import { FormCheckbox } from "@electedtech/electedtech-ui";
import React from "react";
import customFieldsForCategory from "../../../../../../../helpers/customFieldsForCategories";
import propTypes from "./CustomFieldExportCSVForm.propTypes";
import useStyles from "../ExportCSVForm.styles";

const CustomFieldsExportCSVForm = ({ caseCategory, value, onChange }) => {
  const classes = useStyles();

  const customFieldsAsInputs = customFieldsForCategory(caseCategory);

  return (
    <React.Fragment>
      {customFieldsAsInputs.map(({ name, id }) => {
        // const inputName = id;
        return (
          <FormCheckbox
            key={id}
            name={id?.toString()}
            value={value?.[id]}
            size={"small"}
            label={name}
            onChange={onChange}
            keepErrorSpacing={false}
            customClassNames={{
              label: classes.label,
              input: classes.input,
              container: classes.container,
            }}
          />
        );
      })}
    </React.Fragment>
  );
};

CustomFieldsExportCSVForm.propTypes = propTypes;
export default CustomFieldsExportCSVForm;
