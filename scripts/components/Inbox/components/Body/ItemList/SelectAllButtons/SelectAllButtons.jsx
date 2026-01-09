import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import propTypes from "./SelectAllButtons.propTypes.js";
import { useReduxSlice } from "./SelectAllButtons.redux.js";
import useStyles from "./SelectAllButtons.styles.js";

const SelectAllButtons = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  const { selectedItems, items, selectAll, deselectAll } = useReduxSlice();

  const showSelectAll = Object.keys(selectedItems)?.length > 0;
  const allSelected = Object.keys(selectedItems)?.length === items?.length;

  if (!showSelectAll) return null;

  return (
    <div className={classes.bulkSelectButtons}>
      <button onClick={allSelected ? deselectAll : selectAll}>
        {allSelected ? iln.gettext("Deselect All") : iln.gettext("Select All")}
      </button>
      {!allSelected && (
        <button onClick={deselectAll}>{iln.gettext("Deselect All")}</button>
      )}
    </div>
  );
};

SelectAllButtons.propTypes = propTypes;

export default SelectAllButtons;
