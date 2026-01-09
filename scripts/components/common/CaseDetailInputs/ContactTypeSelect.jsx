import { FormSelect } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { contactTypes } from "../../../helpers/localStorageHelper";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  labelWidth: {
    // Global style sheet sets label width to 90px which isn't wide enough for contact selects label text
    maxWidth: 90,
  },
  removeMargin: {
    margin: 0,
  },
});

const ContactTypeSelect = ({
  onChange = () => {},
  name,
  label = "Contact Type",
  customClassNames = {},
  keepErrorSpacing = false,
  value = contactTypes[0].id,
}) => {
  const classes = useStyles();

  return (
    <FormSelect
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      name={name}
      label={label}
      keepErrorSpacing={keepErrorSpacing}
      customClassNames={{
        select: customClassNames.select,
        label: classnames(classes.labelWidth, customClassNames.label),
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
    >
      {contactTypes
        .slice()
        .sort((a, b) => a.contacttype.localeCompare(b.contacttype))
        .map((ct) => (
          <option key={ct.id} value={ct.id}>
          {ct.contacttype}
          </option>
        ))}
    </FormSelect>
  );
};

ContactTypeSelect.propTypes = {
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    select: propTypes.string,
  }),
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
};

export default ContactTypeSelect;
