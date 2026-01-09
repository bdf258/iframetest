import BulkActionsButton from "./BulkActionsButton/BulkActionsButton.jsx";
import CaseCount from "./CaseCount/CaseCount.jsx";
import ExportAsCSVButton from "./ExportAsCSVButton/ExportAsCSVButton.jsx";
import React from "react";
import RefreshButton from "./RefreshButton/RefreshButton.jsx";
import propTypes from "./Actions.propTypes.js";
import useStyles from "./Actions.styles.js";

const Actions = ({ state, dispatch }) => {
  const classes = useStyles();

  return (
    <div className={classes.actions}>
      <CaseCount state={state} />
      <ExportAsCSVButton state={state} />
      <BulkActionsButton state={state} dispatch={dispatch} />
      <RefreshButton state={state} dispatch={dispatch} />
    </div>
  );
};

Actions.propTypes = propTypes;

export default Actions;
