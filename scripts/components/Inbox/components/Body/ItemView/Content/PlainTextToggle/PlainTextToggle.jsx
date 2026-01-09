import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../context/translation/TranslationContext";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const PlainTextToggle = ({ onClick, value }) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <Button type="text" className={classes.button} onClick={onClick}>
      {iln.gettext("Something wrong?")}{" "}
      {value ? iln.gettext("Try rich text") : iln.gettext("Try plain text")}
    </Button>
  );
};

PlainTextToggle.propTypes = propTypes;

export default PlainTextToggle;
