import { FlexBox, Spinner } from "@electedtech/electedtech-ui";
import React, { useContext } from "react";

import { TranslationContext } from "context/translate";
import { useStyles } from "./styles";

const LoadingEmailThreadModal = () => {
  const classes = useStyles();
  const iln = useContext(TranslationContext);

  return (
    <FlexBox hAlign={"space-around"}>
      <div className={classes.emailThreadLoadingTextContainer}>
        <Spinner scale={1} />
        <div>{iln.gettext("Loading email thread")}</div>
      </div>
    </FlexBox>
  );
};

export default LoadingEmailThreadModal;
