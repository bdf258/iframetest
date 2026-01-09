import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../context/translation/TranslationContext";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen";
import { useReduxSlice } from "./FilterTypeSelect.redux";
import { useStyles } from "./styles";

export const subjectFilterType = "subject";
export const addressFilterType = "address";
export const bodyFilterType = "body";

const FilterTypeSelect = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { type, updateFilters } = useReduxSlice();

  const isDisabled = useIsSliderOpen();

  return (
    <div
      className={classes.typeSelectWrapper}
      title={
        isDisabled
          ? iln.gettext(
              "You cannot change the inbox filters while the slider is open"
            )
          : undefined
      }
    >
      <div className={classes.label}>{iln.gettext("With")}</div>
      <FormSelect
        name="inboxTypeSelect"
        value={type}
        onChange={({ target: { value } }) =>
          updateFilters({ contains: { type: value } })
        }
        keepErrorSpacing={false}
        customClassNames={{ container: classes.formSelectContainer }}
      >
        <option value={subjectFilterType}>
          {iln.gettext("A Subject Line")}
        </option>
        <option value={addressFilterType}>
          {iln.gettext("Email Address / Name")}
        </option>
        <option value={bodyFilterType}>{iln.gettext("A Body")}</option>
      </FormSelect>
    </div>
  );
};

export default FilterTypeSelect;
