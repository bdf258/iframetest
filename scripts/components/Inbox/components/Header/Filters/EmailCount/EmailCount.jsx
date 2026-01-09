import React from "react";
import { Spinner } from "@electedtech/electedtech-ui";
import { TranslationContext } from "context/translate";
import { useContext } from "react";
import { useReduxSlice } from "./EmailCount.redux";
import { useStyles } from "./EmailCount.styles";

const EmailCount = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);
  const { itemsTotal } = useReduxSlice();

  return (
    <div className={classes.emailCount}>
      {iln.ngettext("Viewing")}{" "}
      {itemsTotal !== undefined ? (
        itemsTotal
      ) : (
        <Spinner
          scale={0.85}
          customClassNames={{ container: classes.spinner }}
        />
      )}{" "}
      {iln.ngettext("email in:", "emails in:", itemsTotal)}
    </div>
  );
};

export default EmailCount;
