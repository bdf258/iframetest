import React, { useContext } from "react";

import { Spinner } from "@electedtech/electedtech-ui";
import TranslationContext from "context/translate";
import useStyles from "./RefreshOverlay.styles.js";

const RefreshOverlay = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.refreshOverlay}>
      <Spinner scale={1} />
      <span className={classes.refreshText}>
        {iln.gettext("Refreshing")}...
      </span>
    </div>
  );
};

export default RefreshOverlay;
