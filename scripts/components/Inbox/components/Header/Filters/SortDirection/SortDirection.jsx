import React, { useContext } from "react";

import { FormSelect } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../context/translation/TranslationContext";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen";
import { useReduxSlice } from "./SortDirection.redux";
import { useStyles } from "./SortDirection.styles";

const OrderButton = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { sortDirection, updateFilters } = useReduxSlice();

  const isDisabled = useIsSliderOpen();

  return (
    <div
      className={classes.orderSelectWrapper}
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
        value={sortDirection}
        onChange={({ target: { value } }) =>
          isDisabled ? () => {} : updateFilters({ dir: value })
        }
        keepErrorSpacing={false}
        customClassNames={{ container: classes.formSelectContainer }}
      >
        <option value="ASC">{iln.gettext("Oldest First")}</option>
        <option value="DESC">{iln.gettext("Newest First")}</option>
      </FormSelect>
    </div>
  );
};

export default OrderButton;
