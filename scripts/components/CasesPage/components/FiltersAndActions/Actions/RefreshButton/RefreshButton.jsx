import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { defaultFilters } from "../../../../consts/initialFilters.js";
import propTypes from "./RefreshButton.propTypes.js";
import useStyles from "./RefreshButton.styles.js";

const RefreshButton = ({ dispatch, state }) => {
  const iln = useContext(TranslationContext);
  const classes = useStyles();

  return (
    <Button
      customClassNames={classes.clearFilters}
      type="text"
      isDisabled={!state?.results?.cases}
      onClick={() => dispatch({ type: "SET_FILTERS", payload: defaultFilters })}
    >
      {iln.gettext("Clear All Filters")}
    </Button>
  );
};

RefreshButton.propTypes = propTypes;

export default RefreshButton;
