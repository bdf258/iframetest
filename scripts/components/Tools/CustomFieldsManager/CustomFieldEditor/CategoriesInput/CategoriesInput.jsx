import React, { useContext } from "react";

import { FormChipInput } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { categoryTypes } from "../../../../../helpers/localStorageHelper";
import propTypes from "./CategoriesInput.propTypes";
import useStyles from "../CustomFieldEditor.styles";

const CategoriesInput = ({ handleFormChange, field, validCategory }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  const fieldToCategoryChips = () =>
    field.categories.map((categoryId) => ({
      id: categoryId,
      label:
        categoryTypes.filter((type) => categoryId === type.id)?.[0]
          ?.categorytype ||
        `${iln.gettext("Unknown category ID")}: ${categoryId}`,
    }));

  const chipsToCategoryIds = (categoryChips) =>
    categoryChips.map((chip) => chip.id);

  return (
    <FormChipInput
      customClassNames={{
        label: classes.label,
        container: classes.inputContainer,
      }}
      label={iln.gettext("Visible In (Category)")}
      value={{
        value: "",
        chips: fieldToCategoryChips(),
      }}
      chipSource={categoryTypes.map((type) => {
        return { label: type.categorytype, id: type.id };
      })}
      onChange={(e) => {
        handleFormChange({
          target: {
            name: "categories",
            value: chipsToCategoryIds(e.target.value.chips),
          },
        });
      }}
      error={validCategory.touched ? validCategory.errorText : null}
      keepErrorSpacing={false}
      name="categories"
      addNewChips={false}
    />
  );
};

CategoriesInput.propTypes = propTypes;
export default CategoriesInput;
