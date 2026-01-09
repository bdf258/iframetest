import CoreFilters from "./CoreFilters/CoreFilters.jsx";
import CustomFilters from "./CustomFilters/CustomFilters.jsx";
import React from "react";
import propTypes from "./Filters.propTypes.js";
import useStyles from "./Filters.styles.js";

const Filters = ({ state, dispatch }) => {
  const classes = useStyles();

  return (
    <div className={classes.filters}>
      <CoreFilters state={state} dispatch={dispatch} />
      <CustomFilters state={state} dispatch={dispatch} />
    </div>
  );
};

Filters.propTypes = propTypes;

export default Filters;
