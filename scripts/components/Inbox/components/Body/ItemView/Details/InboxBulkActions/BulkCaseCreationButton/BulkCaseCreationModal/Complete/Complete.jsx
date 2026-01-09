import React, { useContext } from "react";

import { Button } from "@electedtech/electedtech-ui";
import TranslationContext from "../../../../../../../../../../context/translation/TranslationContext";
import propTypes from "./propTypes";
import { useStyles } from "./styles";

const Complete = ({
  casesCreated,
  casesMatched,
  emailsActioned,
  onConfirmClick,
}) => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <div className={classes.container}>
      <h3>Case creation complete</h3>
      <p>
        -{" "}
        {iln.ngettext(
          "%1 case was created",
          "%1 cases were created",
          casesCreated || 0
        )}
      </p>
      <p>
        -{" "}
        {iln.ngettext(
          "%1 case was matched",
          "%1 cases were matched",
          casesMatched || 0
        )}
      </p>
      <p>
        -{" "}
        {iln.ngettext(
          "%1 email were marked as actioned",
          "%1 emails were marked as actioned",
          emailsActioned || 0
        )}
      </p>
      <div className={classes.center}>
        <Button onClick={onConfirmClick}>{iln.gettext("OK")}</Button>
      </div>
    </div>
  );
};

Complete.propTypes = propTypes;

export default Complete;
