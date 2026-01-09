import CasesBehalfOfSelect from "./CasesBehalfOfSelect/CasesBehalfOfSelect.jsx";
import CasesCasetypeSelect from "./CasesCasetypeSelect/CasesCasetypeSelect.jsx";
import CasesCategorySelect from "./CasesCategorySelect/CasesCategorySelect.jsx";
import CasesContactSelect from "./CasesContactSelect/CasesContactSelect.jsx";
import CasesDateSelect from "./CasesDateSelect/CasesDateSelect.jsx";
import CasesStatusSelect from "./CasesStatusSelect/CasesStatusSelect.jsx";
import CasesTagSelect from "./CasesTagSelect/CasesTagSelect.jsx";
import CasesTownPostcodeSelect from "./CasesTownPostcodeSelect/CasesTownPostcodeSelect.jsx";
import CasesUserSelect from "./CasesUserSelect/CasesUserSelect.jsx";
import React from "react";
import propTypes from "./CoreFilters.propTypes.js";
import useStyles from "./CoreFilters.styles.js";

const CoreFilters = ({ state, dispatch }) => {
  const classes = useStyles();

  return (
    <div className={classes.filtersGroup}>
      <CasesCategorySelect state={state} dispatch={dispatch} />
      <CasesUserSelect state={state} dispatch={dispatch} />
      <CasesBehalfOfSelect state={state} dispatch={dispatch} />
      <CasesCasetypeSelect state={state} dispatch={dispatch} />
      <CasesStatusSelect state={state} dispatch={dispatch} />
      <CasesDateSelect state={state} dispatch={dispatch} />
      <CasesContactSelect state={state} dispatch={dispatch} />
      <CasesTownPostcodeSelect state={state} dispatch={dispatch} />
      <CasesTagSelect state={state} dispatch={dispatch} />
    </div>
  );
};

CoreFilters.propTypes = propTypes;

export default CoreFilters;
