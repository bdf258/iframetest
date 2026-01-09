import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import useStyles from "./Heading.styles.js";

const Heading = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return <h1 className={classes.heading}>{iln.gettext("Cases")}</h1>;
};

export default Heading;
