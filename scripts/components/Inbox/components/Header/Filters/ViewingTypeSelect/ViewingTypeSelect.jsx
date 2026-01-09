import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../context/translation/TranslationContext";
import inboxTypeOptions from "./consts/inboxTypeOptions";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen";
import { useReduxSlice } from "./ViewingTypeSelect.redux";
import { useStyles } from "./styles";

const ViewingTypeSelect = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { type, updateFilters } = useReduxSlice();

  const isDisabled = useIsSliderOpen();

  const displayOption = {
    inbox: iln.gettext("Inbox"),
    draft: iln.gettext("Drafts"),
    sent: iln.gettext("Sent Items"),
  };

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
      <FormSelect
        name="inboxTypeSelect"
        value={type}
        onChange={({ target: { value } }) => {
          isDisabled ? () => {} : updateFilters({ inboxType: value });
        }}
        keepErrorSpacing={false}
        customClassNames={{ container: classes.formSelectContainer }}
      >
        {inboxTypeOptions.map((option) => (
          <option key={option} value={option}>
            {displayOption[option]}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};

export default ViewingTypeSelect;
