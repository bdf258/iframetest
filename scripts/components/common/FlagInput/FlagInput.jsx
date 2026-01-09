import React, { useContext } from "react";

import { FormChipInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import propTypes from "prop-types";
import useStyles from "./FlagInput.styles";

const FlagInput = ({
  onChange = () => {},
  name,
  label,
  customClassNames = {},
  keepErrorSpacing = false,
  value,
  placeholder,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  if (Array.isArray(value)) {
    value = { chips: value };
  }

  return (
    <FormChipInput
      keepErrorSpacing={keepErrorSpacing}
      label={label || iln.gettext("Flags")}
      name={name}
      placeholder={
        placeholder ||
        iln.gettext(
          "Start typing to filter existing flags or enter a new one and press enter"
        )
      }
      suggestionLabelKey="flag"
      chipLabelKey="flag"
      chipSource={(searchText) => api.searchFlags({ term: searchText })}
      onChange={onChange}
      value={value}
      onNewChipCreate={(text) => api.createFlag({ flag: text })}
      customClassNames={{
        container: classnames(classes.removeMargin, customClassNames.container),
        label: customClassNames.label,
        input: customClassNames.input,
        errorText: customClassNames.errorText,
        autoComplete: {
          input: customClassNames?.autoComplete?.input,
          container: customClassNames?.autoComplete?.container,
          dropDown: customClassNames?.autoComplete?.dropDown,
        },
      }}
    />
  );
};

FlagInput.propTypes = {
  customClassNames: propTypes.shape({
    container: propTypes.string,
    label: propTypes.string,
    input: propTypes.string,
    errorText: propTypes.string,
    autoComplete: propTypes.shape({
      input: propTypes.string,
      container: propTypes.string,
      dropDown: propTypes.string,
    }),
  }),
  keepErrorSpacing: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  value: propTypes.oneOfType([
    propTypes.shape({
      value: propTypes.string,
      chips: propTypes.arrayOf(
        propTypes.shape({
          flag: propTypes.string,
          id: propTypes.oneOfType([propTypes.string, propTypes.number])
            .isRequired,
        }).isRequired
      ),
    }),
    propTypes.arrayOf(
      propTypes.shape({
        flag: propTypes.string,
        id: propTypes.oneOfType([propTypes.string, propTypes.number])
          .isRequired,
      }).isRequired
    ),
  ]).isRequired,
};

export default FlagInput;
