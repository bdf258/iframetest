import React, { useContext } from "react";

import { InputContainer } from "@electedtech/electedtech-ui";
import RefreshIcon from "../../../../../common/icons/RefreshIcon.jsx";
import TranslationContext from "../../../../../../context/translation/TranslationContext.js";
import { useIsSliderOpen } from "../../../Body/ItemList/common/useIsSliderOpen.js";
import { useReduxSlice } from "./RefreshButton.redux";
import { useStyles } from "./styles";

const RefreshButton = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { updateFilters, itemsLoading } = useReduxSlice();

  const isDisabled = useIsSliderOpen();

  return (
    <InputContainer
      customClassNames={classes.inputContainer}
      title={
        isDisabled
          ? iln.gettext("You cannot refresh the inbox while the slider is open")
          : undefined
      }
    >
      <button
        disabled={itemsLoading || isDisabled}
        onClick={() => updateFilters({ page: 1 })}
        className={classes.refreshButton}
      >
        {
          <RefreshIcon
            className={itemsLoading ? classes.spin : undefined}
            width={24}
            height={24}
          />
        }
      </button>
    </InputContainer>
  );
};

export default RefreshButton;
