import React, { useContext } from "react";

import { FormSelectAutoComplete } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getCaseTypes } from "../../../helpers/localStorageHelper";
import propTypes from "prop-types";

const casetypes = getCaseTypes();

const useStyles = createUseStyles({
  removeMargin: {
    margin: 0,
  },
});

const CaseTypeSelect = ({
  onChange = () => {},
  name,
  label,
  customClassNames = {},
  keepErrorSpacing = false,
  value = casetypes[0].id,
  selectedCategoryIDs = [],
  additionalOptions,
}) => {
  selectedCategoryIDs = Array.isArray(selectedCategoryIDs)
    ? selectedCategoryIDs
    : [selectedCategoryIDs];

  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const options = [...(additionalOptions || []), ...casetypes]
    .filter((casetype) => {
      if (selectedCategoryIDs.length === 0) return true;
      if (
        casetype.categorytypeID === 0 ||
        casetype.categorytypeID === undefined
      )
        return true;

      return selectedCategoryIDs.includes(casetype.categorytypeID);
    })
    .sort((a, b) => a.casetype.localeCompare(b.casetype));

  return (
    <FormSelectAutoComplete
      value={value}
      onChange={onChange}
      name={name}
      label={label === undefined ? iln.gettext("Case Type") : label}
      keepErrorSpacing={keepErrorSpacing}
      customClassNames={{
        select: customClassNames.select,
        label: customClassNames.label,
        container: classnames(classes.removeMargin, customClassNames.container),
      }}
    >
      {options.map((ct) => (
        <option key={ct.id} value={ct.id}>
          {ct.casetype}
        </option>
      ))}
    </FormSelectAutoComplete>
  );
};

CaseTypeSelect.propTypes = {
  additionalOptions: propTypes.oneOfType([
    propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.oneOfType([
          propTypes.number,
          propTypes.string,
          propTypes.arrayOf(
            propTypes.oneOfType([propTypes.number, propTypes.string])
          ),
        ]).isRequired,
        casetype: propTypes.string.isRequired,
        categorytypeID: propTypes.number.isRequired,
      })
    ),
  ]),
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    select: propTypes.string,
  }),
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  selectedCategoryIDs: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.number),
    propTypes.number,
  ]),
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.arrayOf(
      propTypes.oneOfType([propTypes.string, propTypes.number])
    ),
  ]).isRequired,
};

export default CaseTypeSelect;
