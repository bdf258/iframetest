import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { categoryTypes } from "../../../helpers/localStorageHelper";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  removeMargin: {
    margin: 0,
  },
});

const CategorySelect = ({
  onChange = () => {},
  name,
  label = "Category",
  customClassNames = {},
  keepErrorSpacing = false,
  value = categoryTypes[0].id,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <FormSelect
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      name={name}
      label={iln.gettext(label)}
      keepErrorSpacing={keepErrorSpacing}
      customClassNames={{
        select: customClassNames.select,
        label: customClassNames.label,
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
    >
      {categoryTypes.map((c, idx) => (
        <option key={idx} value={c.id}>
          {c.categorytype}
        </option>
      ))}
    </FormSelect>
  );
};

CategorySelect.propTypes = {
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

export default CategorySelect;
