import React, { useContext } from "react";

import { FormChipInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import api from "@electedtech/api";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import propTypes from "prop-types";

const useStyles = createUseStyles({
  removeMargin: {
    margin: 0,
  },
});

const callSearchTagsApi = async (searchText) => {
  return await api.searchTags({ term: searchText });
};

const TagInput = ({
  onChange = () => {},
  onChipClick = () => {},
  name,
  label = "Tags",
  customClassNames = {},
  keepErrorSpacing = false,
  value,
  placeholder,
  ...props
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  if (!customClassNames.autoComplete) {
    customClassNames.autoComplete = {};
  }

  if (Array.isArray(value)) {
    value = { chips: value };
  }

  return (
    <FormChipInput
      keepErrorSpacing={keepErrorSpacing}
      label={iln.gettext(label)}
      name={name}
      placeholder={
        placeholder || iln.gettext("Search tags, or press enter to create")
      }
      suggestionLabelKey="tag"
      chipLabelKey="tag"
      chipSource={callSearchTagsApi}
      onChange={onChange}
      onChipClick={onChipClick}
      value={value}
      chipRemoved={(tag) => {
        if (!tag.id) return;
        api.deleteTagIfNotUsedSilent(tag.id);
      }}
      onNewChipCreate={(text) => api.createTag({ tag: text.trim() })}
      createChipOnBlur={true}
      customClassNames={{
        container: classnames(classes.removeMargin, customClassNames.container),
        label: customClassNames.label,
        input: customClassNames.input,
        errorText: customClassNames.errorText,
        autoComplete: {
          input: customClassNames.autoComplete.input,
          container: customClassNames.autoComplete.container,
          dropDown: customClassNames.autoComplete.dropDown,
        },
      }}
      {...props}
    />
  );
};

TagInput.propTypes = {
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
  onChipClick: propTypes.func,
  placeholder: propTypes.string,
  value: propTypes.oneOfType([
    propTypes.shape({
      value: propTypes.string,
      chips: propTypes.arrayOf(
        propTypes.shape({
          tag: propTypes.string,
          id: propTypes.oneOfType([propTypes.string, propTypes.number])
            .isRequired,
        }).isRequired
      ),
    }),
    propTypes.arrayOf(
      propTypes.shape({
        tag: propTypes.string,
        id: propTypes.oneOfType([propTypes.string, propTypes.number])
          .isRequired,
      }).isRequired
    ),
  ]).isRequired,
};

export default TagInput;
