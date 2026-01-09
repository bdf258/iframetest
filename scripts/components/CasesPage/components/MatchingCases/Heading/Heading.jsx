import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import propTypes from "./Heading.propTypes.js";
import useStyles from "./Heading.styles.js";

const Heading = ({ state, dispatch }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.headingContainer}>
      <h2 className={classes.heading}>{iln.gettext("Matching Cases")}</h2>
      <Button
        customClassNames={classes.button}
        isDisabled={!state.results.cases}
        type="text"
        onClick={() =>
          dispatch({
            type: "SET_VIEW",
            payload: state.view === "table" ? "map" : "table",
          })
        }
      >
        {state.view === "table"
          ? iln.gettext("View Results on a Map")
          : iln.gettext("View Results as a Table")}
      </Button>
    </div>
  );
};

Heading.propTypes = propTypes;

export default Heading;
