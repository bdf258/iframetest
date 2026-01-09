import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    margin: "7px auto 0px",
    maxWidth: 920,
    minWidth: 730,
  },
  input: {
    display: "block",
    marginBottom: 5,
  },
  errorSpacing: {
    marginBottom: 24,
  },
});

export const ComposeEmailPlaceHolder = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder
        width={"100%"}
        height={32}
        className={classnames(classes.input, classes.errorSpacing)}
      />
      <Placeholder width={"100%"} height={250} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
    </div>
  );
};
