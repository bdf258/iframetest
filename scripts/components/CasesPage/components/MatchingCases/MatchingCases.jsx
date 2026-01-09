import Heading from "./Heading";
import Map from "./Map";
import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import Table from "./Table";
import { getUserPreferences } from "../../../../helpers/localStorageHelper";
import propTypes from "./MatchingCases.propTypes.js";
import useStyles from "./MatchingCases.styles.js";

const { searchResultsPerPage } = getUserPreferences();

const MatchingCases = ({ state, dispatch }) => {
  const classes = useStyles();

  if (!state.results?.cases)
    return (
      <div className={classes.matchingCases}>
        <Heading state={state} dispatch={dispatch} />
        <Placeholder
          width="100%"
          height={`${27 + 50 * searchResultsPerPage}px`}
        />
      </div>
    );

  return (
    <div className={classes.matchingCases}>
      <Heading state={state} dispatch={dispatch} />
      {state.view === "table" ? (
        <Table state={state} dispatch={dispatch} />
      ) : (
        <div className={classes.mapHeightWrapper}>
          <Map state={state} dispatch={dispatch} />
        </div>
      )}
    </div>
  );
};

MatchingCases.propTypes = propTypes;

export default MatchingCases;
