import { Placeholder } from "@electedtech/electedtech-ui";
import React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "810",
    margin: "7px auto 0px",
  },
  input: {
    display: "block",
    marginBottom: 5,
  },
  bottomSpacing: {
    marginBottom: 12,
  },
});

export const QuickReplyEditorPlaceholder = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
      <Placeholder
        width={"100%"}
        height={32}
        className={classnames(classes.input, classes.bottomSpacing)}
      />
      <Placeholder width={"100%"} height={250} className={classes.input} />
      <Placeholder width={"100%"} height={32} className={classes.input} />
    </div>
  );
};

export default QuickReplyEditorPlaceholder;
