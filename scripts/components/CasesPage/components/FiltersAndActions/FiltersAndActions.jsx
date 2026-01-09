import Actions from "./Actions";
import { Card } from "@electedtech/electedtech-ui";
import Filters from "./Filters";
import Heading from "./Heading";
import React from "react";
import propTypes from "./FiltersAndActions.propTypes";
import useStyles from "./FiltersAndActions.styles.js";

const FiltersAndActions = ({ state, dispatch }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Heading />
      <Card className={classes.filtersAndActions}>
        <Filters state={state} dispatch={dispatch} />
        <Actions state={state} dispatch={dispatch} />
      </Card>
    </React.Fragment>
  );
};

FiltersAndActions.propTypes = propTypes;

export default FiltersAndActions;
