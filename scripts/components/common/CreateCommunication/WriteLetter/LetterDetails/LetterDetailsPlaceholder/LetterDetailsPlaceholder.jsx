import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputPlaceholder: {
    height: 30,
    marginBottom: 24,
  },
});

export const LetterDetailsPlaceholder = () => {
  const classes = useStyles();

  return (
    <div>
      <Placeholder
        className={classes.inputPlaceholder}
        height={100}
        width={"100%"}
      />
      <Placeholder
        className={classes.inputPlaceholder}
        height={100}
        width={"100%"}
      />
      <Placeholder
        className={classes.inputPlaceholder}
        height={100}
        width={"100%"}
      />
      <Placeholder
        className={classes.inputPlaceholder}
        height={100}
        width={"100%"}
      />
    </div>
  );
};
