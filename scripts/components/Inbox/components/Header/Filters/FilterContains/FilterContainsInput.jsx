import React, { useContext, useState } from "react";

import { FormTextInput } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../context/translation/TranslationContext";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen";
import { useReduxSlice } from "./FilterContainsInput.redux";
import { useStyles } from "./styles";

let typingTimeout;

const FilterContainsInput = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { updateFilters, containsValue } = useReduxSlice();

  const [inputValue, seInputValue] = useState(containsValue);

  const isDisabled = useIsSliderOpen();

  return (
    <div
      className={classes.ContainsInputWrapper}
      title={
        isDisabled
          ? iln.gettext(
              "You cannot change the inbox filters while the slider is open"
            )
          : undefined
      }
    >
      <div className={classes.label}>{iln.gettext("Containing:")}</div>
      <FormTextInput
        name="contains"
        value={inputValue}
        onChange={({ target: { value } }) => {
          seInputValue(value);
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(
            () => updateFilters({ contains: { value } }),
            1000
          );
        }}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.formSelectContainer }}
        disabled={isDisabled}
      />
    </div>
  );
};

export default FilterContainsInput;
